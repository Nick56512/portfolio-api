import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UploadImageRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
