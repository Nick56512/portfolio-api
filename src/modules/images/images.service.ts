import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./entities/image.entity";
import { ImageDto } from "./dto/image.dto";

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image) private readonly imageModel: typeof Image) {}

    public createImageInPortfolio(image: ImageDto) {
        const 
    }
}