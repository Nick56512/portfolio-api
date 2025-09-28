import {
  RoutingControllerKeys,
  RoutingEndpointKeys,
} from '@common/routes/routes';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Headers,
  BadRequestException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationRequest } from './dto/registration.request';
import { RegistrationResponse } from './dto/registration.response';
import { JwtAccessGuard } from '@modules/auth/guards/jwt.access.guard';
import { AuthService } from '@modules/auth/auth.service';

@Controller(RoutingControllerKeys.User)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post(RoutingEndpointKeys.Registration)
  @HttpCode(HttpStatus.CREATED)
  public async registration(
    @Body() registrationRequest: RegistrationRequest,
  ): Promise<RegistrationResponse> {
    const newUser = await this.userService.registration({
      ...registrationRequest,
    });
    return {
      newUserId: newUser.id,
      success: true,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  public async remove(
    @Param('id') id: number,
    @Headers('authorization') authHeader: string,
    @Req() req,
  ) {
    if (!id) {
      throw new BadRequestException('ID cannot be empty');
    }
    if (req.user.userId !== +id) {
      throw new ForbiddenException('You can only delete your own profile');
    }
    const result = await this.userService.removeUser(id);
    if (result) {
      const token = authHeader.split(' ')[1];
      await this.authService.logout(token);
    }
    return {
      success: result,
    };
  }
}
