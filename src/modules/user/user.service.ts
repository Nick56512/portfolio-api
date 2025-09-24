import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { RegistrationRequest } from "./dto/registration.request";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    public async registration(userDto: UserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({
            where: {
                email: userDto.email,
            }
        })
        if(existingUser) {
            throw new ConflictException('User with this email is alredy exists')
        }
        const newUser = await this.userModel.create({
            ...userDto
        })
        return newUser
    }
}