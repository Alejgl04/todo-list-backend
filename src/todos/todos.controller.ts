import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createTodoDto: CreateTodoDto, @GetUser() user: User) {
    return this.todosService.create(createTodoDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
    return this.todosService.findAll(user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ) {
    console.log('qdasdasdasd');
    return this.todosService.update(id, updateTodoDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.todosService.remove(id, user);
  }
}
