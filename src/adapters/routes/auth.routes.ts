import express,{ Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authUsecase } from "../../usecases/auth.usecase";
import { authRepository } from "../repositories/mongodb/auth.repository";

import { otpService } from "../services/otp.service";
import { mailerService } from "../services/mailer.service";
import { PasswordService } from "../services/password.service";
import { JWT } from "../services/jwt.service";

const authRoute:Router = express.Router();

const passwordService = new PasswordService();
const AuthRepository = new authRepository();
const OtpService =new otpService()
const MailerService = new mailerService()
const jwt = new JWT()
const AuthUseCase = new authUsecase(AuthRepository,passwordService,OtpService,MailerService,jwt);
const AuthController = new authController(AuthUseCase);

authRoute.post('/register',AuthController.registerRequest.bind(AuthController));
authRoute.post('/verify-otp',AuthController.verifyOtpRequest.bind(AuthController));
authRoute.get('/verify-token',AuthController.verifyTokenRequest.bind(AuthController));
authRoute.post('/login',AuthController.loginRequest.bind(AuthController));
authRoute.get('/logout',AuthController.logoutRequest.bind(AuthController));


export default authRoute