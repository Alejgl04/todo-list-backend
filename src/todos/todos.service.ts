import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { firebaseDb } from '../config';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoStatus } from './enum/todos.status';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto, user: User) {
    try {
      const newTodo = {
        ...createTodoDto,
        status: TodoStatus.PENDING,
        date: new Date().getTime(),
      };

      const userId = user._id;
      const newDoc = doc(
        collection(firebaseDb, `${userId}/backend-todos/todos`),
      );

      await setDoc(newDoc, newTodo);
      return {
        completed: true,
        newTodo,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(user: User) {
    const userId = user._id;
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

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    try {
      const userId = 'Abcasd12';
      const docRef = doc(firebaseDb, `${userId}/backend-todos/todos/${id}`);
      await setDoc(docRef, updateTodoDto, { merge: true });
      return {
        completed: true,
        newTodo: updateTodoDto,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const userId = 'Abcasd12';

      const removeTodo = doc(firebaseDb, `${userId}/backend-todos/todos/${id}`);
      await deleteDoc(removeTodo);
      return {
        completed: true,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    throw new InternalServerErrorException(error);
  }
}
