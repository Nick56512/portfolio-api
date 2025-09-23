import { RoutingControllerKeys, RoutingEndpointKeys } from "@common/routes/routes";
import { Controller, HttpCode, HttpStatus, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegistrationRequest } from "./dto/registration.request";

@Controller(RoutingControllerKeys.User)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post(RoutingEndpointKeys.Registration)
    @HttpCode(HttpStatus.CREATED) 
    public async registration(@Body() registrationRequest: RegistrationRequest) {
        const newUser = await this.userService.registration(registrationRequest)
        
    }

    

}