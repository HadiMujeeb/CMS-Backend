import { IUser } from "../../domain/user.entity";

export interface IAuthRepository {
  createUser(name:string,email:string,password:string): Promise<void>;
  isUserVerified(email: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(id:string):Promise<IUser | null>;
  updateExistUserData(email:string,name:string,password:string):Promise<void>
  updateUserOtp(email: string, otp: string, expireAt: Date ): Promise<IUser | null>;
  updateUserVerified(email: string, isVerified: boolean): Promise<IUser | null>;
  
}