import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PortfolioDto } from './dto/portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio) private readonly portfolioModel: typeof Portfolio,
  ) {}

  public async createPortfolio(
    newPortfolio: PortfolioDto,
  ): Promise<PortfolioDto> {
    const result = await this.portfolioModel.create({
      ...newPortfolio,
    });
    return result;
  }

  public async getPortfolioById(id: number) {
    const result = await this.portfolioModel.findByPk(id);
    if (!result) {
      throw new NotFoundException('Portfolio with this id does not exists');
    }
    return result;
  }

  public async removePortfolio(id: number) {
    const result = await this.portfolioModel.destroy({
      where: {
        id,
      },
    });
    if (result === 0) {
      throw new BadRequestException('Portfolio with this id does not exists');
    }
    return result > 0;
  }
}
