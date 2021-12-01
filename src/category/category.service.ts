import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskService } from 'src/task/task.service';
import { Not, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @Inject(forwardRef(() => TaskService))
    private taskService: TaskService,
  ) {}

  async categoryKeyExists(key: string) {
    const found = await this.categoryRepository.findOne({
      where: { key },
    });

    return Boolean(found);
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const { key } = createCategoryDto;
      if (await this.categoryKeyExists(key)) {
        throw new BadRequestException(`Category with key: ${key} already exists`)
      }
      const saved = await this.categoryRepository.save(createCategoryDto);
      return saved as CategoryEntity;
    } catch(error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error(error)
    }
  }

  async getAllCategories() {
    const list = await this.categoryRepository.find({});
    return list;
  }

  async getCategoryById(id: number) {
    const found = await this.categoryRepository.findOne({
      where: { id },
    });

    return found;
  }

  async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update({ id }, updateCategoryDto);
    return true;
  }

  async deleteCategoryById(id: number) {
    await this.taskService.deleteByCategory(id)
    await this.categoryRepository.delete({ id });
    return true;
  }
}
