import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { RegistrationRequest } from "./dto/registration.request";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    public async registration(registrationRequest: RegistrationRequest): Promise<User> {
        const newUser = await this.userModel.create({
            ...registrationRequest
        })
        return newUser
    }
}