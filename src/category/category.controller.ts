import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({
    type: CreateCategoryDto,
  })
  async createCategory(@Body() createCategoryDTO: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDTO)
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategoryById(categoryId, updateCategoryDto)
  }

  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategoryById(categoryId)
  }
}
