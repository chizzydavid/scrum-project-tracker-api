import BaseEntity from 'src/common/base.entity';
import { TaskEntity } from 'src/task/entity/task.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  key: string;

  @OneToMany(() => TaskEntity, (task) => task.id)
  tasks: TaskEntity[];
}
