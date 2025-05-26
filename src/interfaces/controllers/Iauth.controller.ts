import { Request, Response, NextFunction } from "express";

export interface IAuthController {
  registerRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  loginRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  logoutRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyOtpRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyTokenRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
}
