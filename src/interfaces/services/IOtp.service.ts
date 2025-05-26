export interface IOtpService {
  generate(): string;
  ExpireDate(): Date;
}