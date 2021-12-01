import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDTO: CreateTaskDto) {
    return this.taskService.createTask(createTaskDTO)
  }

  @Get()
  async getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('category/:categoryId')
  async getTasksInCategory(@Param('categoryId') categoryId: number) {
    return this.taskService.getTasksByCategory(categoryId)
  }

  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTaskById(taskId, updateTaskDto)
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: number) {
    return this.taskService.deleteByTaskId(taskId)
  }
}
