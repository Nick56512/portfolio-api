import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UploadImageRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;
}