import { RoutingControllerKeys, RoutingEndpointKeys } from "@common/routes/routes";
import { Controller, HttpCode, HttpStatus, Post, Body, BadRequestException } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegistrationRequest } from "./dto/registration.request";
import { RegistrationResponse } from "./dto/registration.response";

@Controller(RoutingControllerKeys.User)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post(RoutingEndpointKeys.Registration)
    @HttpCode(HttpStatus.CREATED) 
    public async registration(@Body() registrationRequest: RegistrationRequest): Promise<RegistrationResponse> {
        const newUser = await this.userService.registration({
            ...registrationRequest
        })
        return {
            newUserId: newUser.id,
            success: true
        }
    }

    

}