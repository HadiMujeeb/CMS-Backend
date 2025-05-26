import bcrypt from "bcryptjs";
import { IPasswordService } from "../../interfaces/services/IPassword.service";

export class PasswordService implements IPasswordService {
  private saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
