import nodemailer, { Transporter } from 'nodemailer';
import { ENV } from './env';
export const createTransporter = (): Transporter => {
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: ENV.MAIL,
      pass: ENV.PASS,
    },
  });
};