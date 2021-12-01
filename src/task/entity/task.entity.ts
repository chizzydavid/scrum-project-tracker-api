import { CategoryEntity } from 'src/category/entity/category.entity';
import BaseEntity from 'src/common/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class TaskEntity extends BaseEntity {
  @Column()
  key: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn()
  category: CategoryEntity;

  @Column()
  categoryId: number;
}
