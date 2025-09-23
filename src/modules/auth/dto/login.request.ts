import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 5,
    minNumbers: 2,
  })
  password: string;
}
