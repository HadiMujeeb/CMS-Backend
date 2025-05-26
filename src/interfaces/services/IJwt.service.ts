export interface IJsonWebToken {
  generateToken(id: string): string;
  refreshToken(userId: string): string;
  verifyToken(token: string): string | object; 
}