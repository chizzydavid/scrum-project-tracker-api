import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';




interface Task extends Omit<TaskEntity, 'category'> {}

const taskDtoStub = (update?: Partial<CreateTaskDto>): CreateTaskDto => {
  const body = {
    key: "ZDJLC0Zq",
    description: "Implement Unit Testing",
    categoryId: 1    
  }
  return Object.assign({}, body, update);
}

const taskStub = (update?: Partial<Task>): Task => {
  const body = {
    id: 1,
    key: "ZDJLC0Zq",
    description: "Implement Unit Testing",
    categoryId: 1,
    createdAt: "2022-07-20T18:18:21.000Z",
    updtedAt: "2022-07-20T18:18:21.000Z"
  }
  return Object.assign({}, body, update)
}


const mockTaskService = jest.fn().mockReturnValue({
  createTask: jest.fn().mockResolvedValue(taskStub()),
  getAllTasks: jest.fn().mockResolvedValue([taskStub()]),
  getTasksByCategory: jest.fn().mockResolvedValue([taskStub()]),
  updateTaskById: jest.fn().mockResolvedValue(true),
  deleteByTaskId: jest.fn().mockResolvedValue(true)  
})

describe('TaskController Suite', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService()
        }
      ]
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
    jest.clearAllMocks()
  });


  test('Module Setup & Providers Injected', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
    expect(taskService).toHaveProperty('createTask');
  });

  test('Create New Task', async () => {
    const task = await taskController.createTask(taskDtoStub())

    expect(task.id).toBeDefined()
    expect(task.description).toEqual(taskStub().description)
    expect(taskService.createTask).toHaveBeenCalledTimes(1)
    expect(taskService.createTask).toHaveBeenCalledWith(taskDtoStub())
  })  

  test('Get All Tasks', async () => {
    const tasks = await taskController.getAllTasks()

    expect(Array.isArray(tasks)).toBeTruthy()
    expect(tasks[0]).toBeDefined()
    expect(taskService.getAllTasks).toHaveBeenCalledTimes(1)
  });


  test('Get All Tasks By Category', async () => {
    const categoryId = taskDtoStub().categoryId;
    const tasks = await taskController.getTasksInCategory(categoryId)

    expect(Array.isArray(tasks)).toBeTruthy()
    expect(tasks[0]).toBeDefined()
    expect(taskService.getTasksByCategory).toHaveBeenCalledTimes(1)
    expect(taskService.getTasksByCategory).toHaveBeenCalledWith(categoryId)
  })  

  test('Update Existing Task', async () => {
    const taskId = taskStub().id;
    const update = { description: "Changed Description" };
    const updatedBody = taskDtoStub(update);

    const result = await taskController.updateTask(taskId, updatedBody);
    expect(result).toBeTruthy()
    expect(taskService.updateTaskById).toHaveBeenCalledTimes(1)
    expect(taskService.updateTaskById).toHaveBeenCalledWith(taskId, updatedBody)
  })  


  test('Delete Task', async () => {
    const taskId = taskStub().id;

    const result = await taskController.deleteTask(taskId);
    expect(result).toBeTruthy()
    expect(taskService.deleteByTaskId).toHaveBeenCalledTimes(1)
    expect(taskService.deleteByTaskId).toHaveBeenCalledWith(taskId)
  })  
});

