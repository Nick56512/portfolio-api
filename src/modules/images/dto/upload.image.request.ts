import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UploadImageRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(1)
    portfolioId: number

    @IsString()
    @IsOptional()
    description?: string;
}