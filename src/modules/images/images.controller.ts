import { multerOptions } from "@common/config/multer.config";
import { RoutingControllerKeys } from "@common/routes/routes";
import { Controller, HttpCode, HttpStatus, Post, UseInterceptors, UploadedFile, Body, Req, UseGuards, NotFoundException, ForbiddenException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadImageRequest } from "./dto/upload.image.request";
import { PortfolioService } from "@modules/portfolio/portfolio.service";
import { ImageService } from "./images.service";
import { JwtAuthGuard } from "@modules/auth/guards/jwt.auth.guard";

@Controller(RoutingControllerKeys.Image)
export class ImagesController {

    constructor(
        private readonly portfolioService: PortfolioService,
        private readonly imagesService: ImageService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @UseGuards(JwtAuthGuard)
    public async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Body() newImage: UploadImageRequest,
        @Req() req
    ) {
        const userId = req.user.userId
        const portfolio = await this.portfolioService.getPortfolioById(newImage.portfolioId)
        if(portfolio.userId !== userId) {
            throw new ForbiddenException("You cannot add images to someone else's portfolio.")
        }
        const result = this.imagesService.createImageInPortfolio()
    }
}