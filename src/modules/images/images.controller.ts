import { multerOptions } from '@common/config/multer.config';
import { RoutingControllerKeys } from '@common/routes/routes';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  Param,
  ParseIntPipe,
  Query,
  Delete,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageRequest } from './dto/upload.image.request';
import { PortfolioService } from '@modules/portfolio/portfolio.service';
import { ImageService } from './images.service';
import { JwtAccessGuard } from '@modules/auth/guards/jwt.access.guard';
import { memoryStorage } from 'multer';
import { getFileName } from '@common/utils/get.file.name';

@Controller(RoutingControllerKeys.Image)
export class ImagesController {
  constructor(
    private readonly portfolioService: PortfolioService,
    private readonly imagesService: ImageService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public getByRange(
    @Query('offset', ParseIntPipe) offset: number,
    @Query('limit', ParseIntPipe) limit: number
  ) 
  {
    return this.imagesService.getImagesByRange(offset, limit)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @UseGuards(JwtAccessGuard)
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() newImage: UploadImageRequest,
    @Req() req,
    @Query('portfolioId', ParseIntPipe) portfolioId: number,
  ) {
    const userId = req.user.userId;
    const portfolio = await this.portfolioService.getPortfolioById(portfolioId);
    if (portfolio.userId !== userId) {
      throw new ForbiddenException(
        "You cannot add images to someone else's portfolio.",
      );
    }
    const result = await this.imagesService.createImageInPortfolio({
      ...newImage,
      portfolioId,
      fileName: file.originalname,
      filePath: `./images/${getFileName(file.originalname)}`
    }, file.buffer);
    return {
      newImageId: result.id,
      success: true,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  public async removeImage(@Param('id') id: number, @Req() req) {
    const userId = req.user.userId;
    const image = await this.imagesService.getImageById(id);
    const portfolio = await this.portfolioService.getPortfolioById(
      image.portfolioId,
    );
    if (portfolio.userId !== userId) {
      throw new ForbiddenException(
        "You cannot delete images in someone else's portfolio.",
      );
    }
    const success = this.imagesService.removeImage(image);
    return {
      success
    };
  }
}
