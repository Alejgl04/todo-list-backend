import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TodosModule,
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB'), // Loaded from .ENV
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
