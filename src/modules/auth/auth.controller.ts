import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import {
  RoutingControllerKeys,
  RoutingEndpointKeys,
} from 'src/common/routes/routes';
import { LoginRequest } from './dto/login.request';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller(RoutingControllerKeys.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(RoutingEndpointKeys.Login)
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginRequest: LoginRequest) {
    return this.authService.login(loginRequest);
  }

  @Post(RoutingEndpointKeys.Logout)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException(
        'You cannot logout until you not have active token',
      );
    }
    const token = authHeader.split(' ')[1];
    await this.authService.logout(token);
    return {
      success: true,
    };
  }
}
