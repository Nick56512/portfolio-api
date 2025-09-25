import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImageService } from "./images.service";
import { PortfolioService } from "@modules/portfolio/portfolio.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./entities/image.entity";
import { Portfolio } from "@modules/portfolio/entities/portfolio.entity";

@Module({
    imports: [ SequelizeModule.forFeature([Image, Portfolio]) ],
    controllers: [ImagesController],
    providers: [ ImageService, PortfolioService]
})
export class ImagesModule {}