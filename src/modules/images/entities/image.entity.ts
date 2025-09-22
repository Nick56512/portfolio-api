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
import { Comment } from '../../comments/entities/comment.entity';

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fileSize: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mimeType: string;

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
