import { Match } from "@common/decorators/match.decorator";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from "class-validator";

export class RegistrationRequest {
  @IsEmail({}, { message: "Email must be a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @IsStrongPassword(
    {
      minLength: 5,
      minNumbers: 2,
      minSymbols: 0,
      minUppercase: 0
    },
    {
      message:
        "Password must be at least 5 characters long and contain at least 2 numbers",
    }
  )
  password: string;

  @IsNotEmpty({ message: "Confirm password is required" })
  @IsStrongPassword(
    {
      minLength: 5,
      minNumbers: 2,
      minSymbols: 0,
      minUppercase: 0
    },
    {
      message:
        "Confirm password must be at least 5 characters long and contain at least 2 numbers",
    }
  )
  @Match("password", { message: "Passwords do not match" })
  confirmPassword: string;

  @IsOptional()
  @IsString({ message: "First name must be a string" })
  @Length(2, 30, {
    message: "First name must be between 2 and 30 characters long",
  })
  firstName: string;

  @IsOptional()
  @IsString({ message: "Last name must be a string" })
  @Length(2, 30, {
    message: "Last name must be between 2 and 30 characters long",
  })
  lastName: string;
}
