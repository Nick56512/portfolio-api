import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Headers,
  UnauthorizedException,
  Req
} from '@nestjs/common';
import {
  RoutingControllerKeys,
  RoutingEndpointKeys,
} from '@common/routes/routes';
import { LoginRequest } from './dto/login.request';
import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';

@Controller(RoutingControllerKeys.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(RoutingEndpointKeys.Login)
  @HttpCode(HttpStatus.OK)
  public login(@Body() loginRequest: LoginRequest) {
    return this.authService.loginByCredentials(loginRequest);
  }

  @Post(RoutingEndpointKeys.Logout)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  public async logout(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException(
        'You cannot logout until you not have active token',
      );
    }
    const token = authHeader.split(' ')[1];
    const success = await this.authService.logout(token);
    return {
      success
    };
  }

  @Post(RoutingEndpointKeys.Refresh)
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Req() request) {
    const userId = request.user.id
    return this.authService.generateTokens(userId)
  }
}
