import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  categoryId?: number;
}
