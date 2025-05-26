import jwt from 'jsonwebtoken';
import { IJsonWebToken } from '../../interfaces/services/IJwt.service';
import { ENV } from '../../config/env';


export class JWT implements IJsonWebToken {
  generateToken(id: string): string {
    return jwt.sign({ id }, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN
    });
  }
  refreshToken(id: string): string {
    return jwt.sign({ id }, ENV.JWT_SECRET, {
      expiresIn: '7d',
    });
  };

  verifyToken(token: string): string | object {
    return jwt.verify(token, ENV.JWT_SECRET);
  };
}
