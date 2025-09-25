import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Model,
} from 'sequelize-typescript';
import { Portfolio } from '../../portfolio/entities/portfolio.entity';

@Table({
  tableName: 'images',
  timestamps: true,
})
export class Image extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fileName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filePath: string;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  portfolioId: number;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @HasMany(() => Comment)
  comments: Comment[];
}

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  imageId: number;

  @BelongsTo(() => Image)
  image: Image;
}

