import { ITokenPair } from "../../domain/common.entity";
import { IUser } from "../../domain/user.entity";


export interface IAuthUseCase {
  registerRequest(name: string, email: string, password: string,confirmPassword:string): Promise<void>;
  loginRequest(email: string, password: string): Promise<ITokenPair>;
//   logoutRequest(userId: string): Promise<void>;
  verifyOtpRequest(email: string, otpCode: string): Promise<ITokenPair>;
//   resendOtpRequest(email: string): Promise<void>;
sentOtpRequest(name:string,email:string):Promise<void>;
validateAccessToken(accessToken:string,refreshToken:string):Promise<{accessToken:string,userData:Omit<IUser,'password' | 'otp' | 'createdAt' | 'updatedAt'>}>;
refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; userId: string }>
}