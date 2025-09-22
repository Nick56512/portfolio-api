import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Image } from '../../images/entities/image.entity';

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  authorName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  })
  authorEmail: string;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  imageId: number;

  @BelongsTo(() => Image)
  image: Image;
}
