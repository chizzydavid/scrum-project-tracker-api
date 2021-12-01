import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entity/category.entity';


interface Category extends Omit<CategoryEntity, 'tasks'> {}

const categoryDtoStub = (update?: Partial<CreateCategoryDto>): CreateCategoryDto => {
  const body = {
    key: "req",
    title: "Requirements",
  }
  return Object.assign({}, body, update);
}

const categoryStub = (update?: Partial<Category>): Category => {
  const body = {
    id: 1,
    key: "req",
    title: "Requirements",
    createdAt: "2022-07-20T18:18:21.000Z",
    updtedAt: "2022-07-20T18:18:21.000Z"
  }
  return Object.assign({}, body, update)
}

const mockCategoryService = jest.fn().mockReturnValue({
  createCategory: jest.fn().mockResolvedValue(categoryStub()),
  getAllCategories: jest.fn().mockResolvedValue([categoryStub()]),
  updateCategoryById: jest.fn().mockResolvedValue(true),
  deleteCategoryById: jest.fn().mockResolvedValue(true)
})

describe('CategoryController Suite', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService()
        }
      ]
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });


  test('Module Setup & Providers Injected', () => {
    expect(categoryController).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(categoryService).toHaveProperty('createCategory');
  });


  test('Create New Category', async () => {
    const category = await categoryController.createCategory(categoryDtoStub())

    expect(category.id).toBeDefined()
    expect(category.title).toEqual(categoryStub().title)
    expect(categoryService.createCategory).toHaveBeenCalledTimes(1)
    expect(categoryService.createCategory).toHaveBeenCalledWith(categoryDtoStub())
  })  

  test('Get All Categories', async () => {
    const categories = await categoryController.getAllCategories()

    expect(Array.isArray(categories)).toBeTruthy()
    expect(categories[0]).toBeDefined()
    expect(categoryService.getAllCategories).toHaveBeenCalledTimes(1)
  });

  test('Update Existing Category', async () => {
    const categoryId = categoryStub().id;
    const update = { title: "Requirements Update" };
    const updatedBody = categoryDtoStub(update);

    const result = await categoryController.updateCategory(categoryId, updatedBody);
    expect(result).toBeTruthy()
    expect(categoryService.updateCategoryById).toHaveBeenCalledTimes(1)
    expect(categoryService.updateCategoryById).toHaveBeenCalledWith(categoryId, updatedBody)
  })  

  test('Delete Category', async () => {
    const categoryId = categoryStub().id;

    const result = await categoryController.deleteCategory(categoryId);
    expect(result).toBeTruthy()
    expect(categoryService.deleteCategoryById).toHaveBeenCalledTimes(1)
    expect(categoryService.deleteCategoryById).toHaveBeenCalledWith(categoryId)
  })    
});


