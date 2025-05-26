import { IAuthUseCase } from "../interfaces/usecases/Iauth.usecase";
import { IAuthRepository } from "../interfaces/repositories/Iauth.repository";
import { IErrorResponse } from "../domain/error.entity";
import { HttpStatus } from "../common/enums/http.status.code";
import { ErrorMessages } from "../common/responseMessages/error.message";
import { IPasswordService } from "../interfaces/services/IPassword.service";
import { IOtpService } from "../interfaces/services/IOtp.service";
import { IMailerService } from "../interfaces/services/IMailer.service";
import { IJsonWebToken } from "../interfaces/services/IJwt.service";
import { ITokenPair } from "../domain/common.entity";
import { IUser } from "../domain/user.entity";
import { error } from "console";
export class authUsecase implements IAuthUseCase {
private AuthRepository:IAuthRepository;
private passwordService:IPasswordService;
private otpService:IOtpService;
private mailerService:IMailerService;
private jwt:IJsonWebToken;
constructor(AuthRepository:IAuthRepository,passwordService:IPasswordService,otpService:IOtpService,mailService:IMailerService,jwt:IJsonWebToken){
    this.AuthRepository = AuthRepository;
    this.passwordService = passwordService;
    this.otpService = otpService;
    this.mailerService = mailService;
    this.jwt = jwt;
}

async registerRequest(name: string, email: string, password: string,confirmPassword:string): Promise<void> {
    try {
        const isExist = await this.AuthRepository.findUserByEmail(email);
        if(isExist&&isExist.isVerifyed) throw {statusCode:HttpStatus.CONFLICT,key:"exists",message:ErrorMessages.exists};
        if(password!==confirmPassword) throw {statusCode:HttpStatus.BAD_REQUEST,key:"passMismatch",message:ErrorMessages.passMismatch};
        const hash = await this.passwordService.hashPassword(password);
        password = hash
        if(isExist&&!isExist.isVerifyed){
            await this.AuthRepository.updateExistUserData(email,name,password)
        }else{
            await this.AuthRepository.createUser(name,email,password);
        }
        await this.sentOtpRequest(name,email);
    } catch (error) {
        throw error
    }
}
async sentOtpRequest(name:string,email: string): Promise<void> {
    try {
    const otp:string = this.otpService.generate();
    const expireAt:Date = this.otpService.ExpireDate();
    const userData =await this.AuthRepository.updateUserOtp(email, otp,expireAt);
    await this.mailerService.sendMail(name,email,otp,expireAt);    
    } catch (error) {
    throw error    
    }
}

async loginRequest(email: string, password: string): Promise<ITokenPair> {
    try {
       const isExist = await this.AuthRepository.findUserByEmail(email);
       if(isExist&&!isExist.isVerifyed||!isExist) throw {statusCode:HttpStatus.NOT_FOUND,key:"notFound",message:ErrorMessages.notFound};
       const isTrue = await this.passwordService.verifyPassword(password,isExist?.password);
       if(!isTrue) throw {statusCode:HttpStatus.UNAUTHORIZED,key:"invalid",message:ErrorMessages.passMismatch}
        const accessToken = this.jwt.generateToken(isExist._id);
        const refreshToken = this.jwt.refreshToken(isExist._id);
        return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

async verifyOtpRequest(email: string, otpCode: string): Promise<ITokenPair> {
    try {
        const isExist = await this.AuthRepository.findUserByEmail(email);
        const currentTime = new Date();
        if(isExist?.otp.expires!=null && isExist?.otp.expires < currentTime){
         throw {statusCode:HttpStatus.GONE,key:"expired",message:ErrorMessages.otpExpired}
        }
        if(isExist?.otp.code!=otpCode){
        throw {statusCode:HttpStatus.UNAUTHORIZED,key:"invalid",message:ErrorMessages.otpExpired}    
        }
        await this.AuthRepository.updateUserVerified(email,true);
        const accessToken = this.jwt.generateToken(isExist._id);
        const refreshToken = this.jwt.refreshToken(isExist._id);
        return {accessToken,refreshToken}
    } catch (error) {
        throw error
    }
}

 async validateAccessToken(accessToken: string, refreshToken: string): Promise<{ accessToken: string; userData: Omit<IUser,'password' | 'otp' | 'createdAt' | 'updatedAt'> }> {
    try {
      const decodedToken = await this.jwt.verifyToken(accessToken);
      if (typeof decodedToken === "object" && decodedToken !== null && "id" in decodedToken) {
        const userData = await this.AuthRepository.findUserById(decodedToken.id as string);
        if (userData && userData.isVerifyed) {
          return { accessToken, userData };
        } else {
          throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.invalidEmail };
        }
      } else {
        const refreshResponse = await this.refreshAccessToken(refreshToken);
        const userData = await this.AuthRepository.findUserById(refreshResponse.userId);
        if (userData && userData.isVerifyed) {
          return { accessToken: refreshResponse.accessToken, userData };
        }
        throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.invalidEmail };
      }
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        const refreshResponse = await this.refreshAccessToken(refreshToken);
        const userData = await this.AuthRepository.findUserById(refreshResponse.userId);
        if (userData && userData.isVerifyed) {
          return { accessToken: refreshResponse.accessToken, userData };
        }
        throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.invalidEmail };
      }
      throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.noToken };
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; userId: string }> {
    try {
      const decodedRefreshToken = this.jwt.verifyToken(refreshToken);
      if (typeof decodedRefreshToken === "object" && decodedRefreshToken !== null && "id" in decodedRefreshToken) {
        const userId = decodedRefreshToken.id as string;
        const userData = await this.AuthRepository.findUserById(userId);
        if (userData && userData.isVerifyed) {
          const newAccessToken = this.jwt.generateToken(userId);
          return { accessToken: newAccessToken, userId };
        } else {
          throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.invalidEmail };
        }
      } else {
        throw { status: HttpStatus.UNAUTHORIZED, key: "invalid", message: ErrorMessages.noToken };
      }
    } catch (error) {
      throw error
    }
  }

}