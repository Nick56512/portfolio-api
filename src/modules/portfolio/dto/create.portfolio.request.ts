import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePortfolioRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
