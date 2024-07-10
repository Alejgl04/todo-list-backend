import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TodosModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://mgt:aCtuLONpkja40eTZ@cluster0.rq21i.mongodb.net/task',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
