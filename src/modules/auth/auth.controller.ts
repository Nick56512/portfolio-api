import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  RoutingControllerKeys,
  RoutingEndpointKeys,
} from 'src/common/routes/routes';
import { LoginRequest } from './dto/login.request';
import { AuthService } from './auth.service';

@Controller(RoutingControllerKeys.Auth)
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post(RoutingEndpointKeys.Login)
    @HttpCode(HttpStatus.OK)
    public login(@Body() loginRequest: LoginRequest) {
        return this.authService.login(loginRequest)
    }
}
