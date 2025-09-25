import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./entities/image.entity";
import { ImageDto } from "./dto/image.dto";

@Injectable()
export class ImageService {
    constructor(@InjectModel(Image) private readonly imageModel: typeof Image) {}

    public async createImageInPortfolio(image: ImageDto): Promise<ImageDto> {
        const result = await this.imageModel.create({
            ...image,
        });
        return result;
    }

    public async getImageById(id: number): Promise<ImageDto> {
        const result = await this.imageModel.findByPk(id)
        if(!result) {
            throw new NotFoundException('Image with this id not found')
        }
        return result
    }
}