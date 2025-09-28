import { RoutingControllerKeys } from '@common/routes/routes';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAccessGuard } from '@modules/auth/guards/jwt.access.guard';
import { CreatePortfolioRequest } from './dto/create.portfolio.request';

@Controller(RoutingControllerKeys.Portfolio)
@UseGuards(JwtAccessGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createPortfolio(
    @Body() newPortfolio: CreatePortfolioRequest,
    @Req() req,
  ) {
    const userId = req.user.userId;
    const result = await this.portfolioService.createPortfolio({
      ...newPortfolio,
      userId,
    });
    return {
      newPortfolioId: result.id,
      success: true,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async removePortfolio(@Param('id') id: number, @Req() req) {
    const userId = req.user.userId;
    const portfolio = await this.portfolioService.getPortfolioById(id);
    if (portfolio.userId !== userId) {
      throw new ForbiddenException(
        "You cannot delete other users's portfolios",
      );
    }
    const result = await this.portfolioService.removePortfolio(id);
    return {
      success: result,
    };
  }
}
