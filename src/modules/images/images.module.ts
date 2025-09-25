import { Module } from "@nestjs/common";
import { ImagesController } from "./images.controller";
import { ImageService } from "./images.service";
import { PortfolioService } from "@modules/portfolio/portfolio.service";

@Module({
    imports: [],
    controllers: [ImagesController],
    providers: [ ImageService, PortfolioService]
})
export class ImagesModule {}