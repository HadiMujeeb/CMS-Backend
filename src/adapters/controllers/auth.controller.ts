import e, { Request, Response, NextFunction } from "express";
import { IAuthController } from "../../interfaces/controllers/Iauth.controller";
import { IAuthUseCase } from "../../interfaces/usecases/Iauth.usecase";
import { HttpStatus } from "../../common/enums/http.status.code";
import { SuccessMessages } from "../../common/responseMessages/success.message";
import { ENV } from "../../config/env";
import { ErrorMessages } from "../../common/responseMessages/error.message";

export class authController implements IAuthController {
    private authUseCase:IAuthUseCase;
    constructor(authUseCase:IAuthUseCase){
        this.authUseCase =authUseCase;
    }
   async registerRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {name,email, password,confirmPassword } = req.body;
            await this.authUseCase.registerRequest(name,email,password,confirmPassword);
            res.status(HttpStatus.OK).json({message:SuccessMessages.create})
        } catch (error) {
            next(error)
        }
    }

    async loginRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email,password} = req.body;
            const tokens = await this.authUseCase.loginRequest(email,password);
            res.cookie("refreshToken",tokens.refreshToken , { maxAge: 604800000, httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: "lax" });
            res.status(HttpStatus.OK).json({ message: SuccessMessages.verify, token: tokens.accessToken });
        } catch (error) {
            next(error)
        }
    }

    async verifyOtpRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email,otp} = req.body;
            const tokens = await this.authUseCase.verifyOtpRequest(email,otp);
            res.cookie("refreshToken",tokens.refreshToken , { maxAge: 604800000, httpOnly: true, secure: ENV.NODE_ENV === "production", sameSite: "lax" });
            res.status(HttpStatus.OK).json({ message: SuccessMessages.verify, token: tokens.accessToken });
        } catch (error) {
            next(error)
        }
    }

    async verifyTokenRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accessToken = req.header('Authorization')?.replace('Bearer ', '');
            const refreshToken = req.cookies.refreshToken;
            if (!accessToken || !refreshToken) throw { statusCode: HttpStatus.UNAUTHORIZED,key:"noToken", message: ErrorMessages.noToken };
            const userData = await this.authUseCase.validateAccessToken(accessToken, refreshToken);
            res.status(HttpStatus.OK).json({ message: SuccessMessages.access, user: userData.userData, token: userData.accessToken});
        } catch (error) {
            next(error)
        }
    }

    async logoutRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" });
           res.status(HttpStatus.OK).json({ message: SuccessMessages.logout});
        } catch (error) {
            next(error)
        }
    }
}