import { IAuthRepository } from "../../../interfaces/repositories/Iauth.repository";
import userModel from "../../../infrastructure/database/mongo/user.model";
import { IUser } from "../../../domain/user.entity";

export class authRepository implements IAuthRepository {
    async createUser(name: string, email: string, password: string): Promise<void> {
        try {
            const newUser = new userModel({name,email,password});
            await newUser.save();
        } catch (error) {
           throw error; 
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await userModel.findOne({ email }).exec();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: string): Promise<IUser | null> {
    try {
      const user = await userModel.findOne({ _id:id }).exec();
      return user;
    } catch (error) {
      throw error
    }
  }

 async updateExistUserData(email: string, name: string, password: string): Promise<void> {
  try {
    await userModel.updateOne(
      { email },
      { $set: { name, password } }
    );
  } catch (error) {
    throw error;
  }
}


async updateUserOtp(email: string, otp: string, expireAt: Date): Promise<IUser | null> {
  try {
    return await userModel.findOneAndUpdate(
      { email },
      { $set: { 'otp.code': otp, 'otp.expires': expireAt } },
      { new: true }
    ).exec();
  } catch (error) {
    throw error;
  }
}


  async updateUserVerified(email: string, isVerified: boolean): Promise<IUser | null> {
    try {
      return await userModel.findOneAndUpdate(
        { email },
        { isVerifyed: isVerified },
        { new: true }
      ).exec();
    } catch (error) {
      throw error;
    }
}

async isUserVerified(email: string): Promise<boolean> {
    try {
      const user = await userModel.findOne({ email });
      return user ? user.isVerifyed : false;
    } catch (error) {
      throw error;
    }
  }

}