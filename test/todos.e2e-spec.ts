import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TodosModule } from '../src/todos/todos.module';

describe('Todos', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TodosModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST task`, () => {
    return request(app.getHttpServer()).post('/task').expect(201);
  });

  it(`/GET task`, () => {
    return request(app.getHttpServer()).get('/task').expect(200);
  });

  it(`/PATCH task/:id`, () => {
    return request(app.getHttpServer())
      .patch('/task/:id')
      .expect(200)
      .expect({ completed: true, newTodo: {} });
  });

  it(`/DELETE task/:id`, () => {
    return request(app.getHttpServer()).patch('/task/:id').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
