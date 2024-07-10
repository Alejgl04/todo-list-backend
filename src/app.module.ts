import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TodosModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
