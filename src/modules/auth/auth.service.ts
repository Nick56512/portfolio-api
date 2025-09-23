import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "@modules/user/entities/user.entity"
import { LoginRequest } from "./dto/login.request";
import { LoginResponse } from "./dto/login.response";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private readonly userModel: typeof User,
                private readonly jwtService: JwtService) {}

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await this.userModel.findOne({
            where: {
                ...loginRequest
            }
        })
        if(!user) {
            throw new BadRequestException('User does not exists')
        }
        return { 
            accessToken: this.jwtService.sign({
                userId: user.id
            })
        }
    }
}