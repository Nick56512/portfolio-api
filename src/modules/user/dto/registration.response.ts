import { IsBoolean, IsNumber } from 'class-validator';
import { Min } from 'sequelize-typescript';

export class RegistrationResponse {
  @IsNumber()
  @Min(1)
  newUserId: number;

  @IsBoolean()
  success: boolean;
}
