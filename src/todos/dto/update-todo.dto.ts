import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatus } from '../enum/todos.status';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  status: TodoStatus;
}
