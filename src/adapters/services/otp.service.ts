import { IOtpService } from "../../interfaces/services/IOtp.service";

export class otpService implements IOtpService {
      generate(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  ExpireDate(): Date {
    return new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now
  }
}
