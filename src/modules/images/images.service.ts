import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from './entities/image.entity';
import { ImageDto } from './dto/image.dto';
import * as fs from 'fs';
import { Portfolio } from '@modules/portfolio/entities/portfolio.entity';
import { getFileName } from '@common/utils/get.file.name';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image) private readonly imageModel: typeof Image) {}

  public async createImageInPortfolio(image: ImageDto, fileBuffer: Buffer): Promise<ImageDto> {
    await fs.promises.writeFile(image.filePath, fileBuffer)
    
    const result = await this.imageModel.create({
      ...image,
    });
    return result;
  }

  public async getImagesByRange(offset: number, limit: number): Promise<ImageDto[]> {
    return this.imageModel.findAll({
      offset,
      limit,
      order: [['createdAt', 'ASC']],
      attributes: ['filePath', 'description'],
      include: [
        {
            model: Portfolio,
            attributes: ['name']
        }
      ]
    });
  }

  public async getImageById(id: number): Promise<ImageDto> {
    const result = await this.imageModel.findByPk(id);
    if (!result) {
      throw new NotFoundException('Image with this id not found');
    }
    return result;
  }

  public async removeImage(image: ImageDto) {
    await new Promise<void>((resolve, reject) => {
      fs.unlink(image.filePath, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
    const result = await this.imageModel.destroy({
      where: {
        id: image.id,
      },
    });

    if (result === 0) {
      throw new BadRequestException('Image with this id does not exists');
    }
    return result > 0;
  }
}
