import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";

export class RegistrationRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 5,
        minNumbers: 2,
    })
    password: string;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 5,
        minNumbers: 2,
    })
    confirmPassword: string;

    @IsOptional()
    @IsString()
    @Length(2, 30)
    firstName: string

    @IsOptional()
    @IsString()
    @Length(2, 30)
    lastName: string
}