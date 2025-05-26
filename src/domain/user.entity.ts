import mongoose from "mongoose";

mongoose

export interface IOtp {
  code: string | null;
  expires: Date | null;
}

export interface IUser {
  _id:string
  name: string;
  email: string;
  password: string;
  picture?: string;
  isVerifyed: boolean;
  otp: IOtp;
  createdAt?: Date;
  updatedAt?: Date;
}
