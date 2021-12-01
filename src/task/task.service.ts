import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService    
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { categoryId: id } = createTaskDto;
    const categoryExists = await this.categoryService.getCategoryById(id)
    if (!categoryExists) {
      throw new NotFoundException(`The category with id: ${id} doesn\'t exist`)
    }
    const created = await this.taskRepository.save(createTaskDto);
    return created as TaskEntity;
  }

  async getAllTasks() {
    const found = await this.taskRepository.find({});
    return found;
  }

  async getTasksByCategory(categoryId: number) {
    const found = await this.taskRepository.find({
      where: {
        category: { id: categoryId },
      },
    });
    return found;
  }

  async getTaskByKey(key: string) {
    const found = await this.taskRepository.findOne({
      where: {
        key,
      },
    });

    return found;
  }

  async getTaskById(id: number) {
    const found = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    return found;
  }

  async updateTaskById(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(
      {
        id,
      },
      updateTaskDto,
    );

    return true;
  }

  async deleteByCategory(categoryId: number) {
    await this.taskRepository.delete({
      category: { id: categoryId },
    });

    return true;
  }

  async deleteByTaskId(taskId: number) {
    await this.taskRepository.delete({
      id: taskId,
    });

    return true;
  }    
}
