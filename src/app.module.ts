import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

import { envs } from './config';

@Module({
  imports: [TodosModule, AuthModule, MongooseModule.forRoot(envs.mongoDb)],
  controllers: [],
  providers: [],
})
export class AppModule {}
