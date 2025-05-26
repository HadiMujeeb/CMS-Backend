import { IMailerService } from "../../interfaces/services/IMailer.service";
import { createTransporter } from "../../config/mailer.config";
import { otpTemplate } from "../../common/template/otp.template";
import { ENV } from "../../config/env";
export class mailerService implements IMailerService {
    private transporter = createTransporter();
    async sendMail(name: string, email: string, otp: string, expireAt:Date): Promise<any> {
       
            const template = otpTemplate(name ,otp,expireAt);
            const mailOptions = {
            from: ENV.MAIL,
            to: email,
            subject: template.subject,
            html: template.html,
    };
        return await this.transporter.sendMail(mailOptions);
        
    }
}