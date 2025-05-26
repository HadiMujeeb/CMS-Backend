export interface IMailerService {
    sendMail(name:string,email:string,otp:string,expireAt:Date):Promise<any>
}