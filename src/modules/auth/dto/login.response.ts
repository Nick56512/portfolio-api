import { IsJWT } from 'class-validator';

export class LoginResponse {
  @IsJWT()
  accessToken: string;

  @IsJWT()
  refreshToken: string;
}
