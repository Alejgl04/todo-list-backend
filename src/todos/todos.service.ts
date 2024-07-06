import { Injectable } from '@nestjs/common';

import { collection, doc, getDocs, setDoc } from 'firebase/firestore/lite';
import { firebaseDb } from '../config';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enum/todos.status';

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      ...createTodoDto,
      status: TodoStatus.PENDING,
      date: new Date().getTime(),
    };

    const userId = 'Abcasd12';
    const newDoc = doc(collection(firebaseDb, `${userId}/backend-todos/todos`));

    await setDoc(newDoc, newTodo);
  }

  async findAll() {
    const userId = 'Abcasd12';
    const todos = [];
    const collectionRef = collection(
      firebaseDb,
      `${userId}/backend-todos/todos`,
    );
    const documents = await getDocs(collectionRef);

    documents.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });

    return todos;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
