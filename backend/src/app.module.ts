import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';
import * as Joi from 'joi';
import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmEnt } from './films/entities/film.entity';
import { ScheduleEnt } from './films/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().optional(),
        DATABASE_HOST: Joi.string().default('localhost'),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USERNAME: Joi.string().default('student'),
        DATABASE_PASSWORD: Joi.string().default('student'),
        DATABASE_NAME: Joi.string().default('prac'),
        DATABASE_DRIVER: Joi.string().default('postgres'),
        DATABASE_TYPE: Joi.string().default('postgres'),
      }),
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public/content/afisha'),
      serveRoot: '/content/afisha',
    }),
    FilmsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USERNAME', 'prac'),
        password: config.get<string>('DATABASE_PASSWORD', 'prac'),
        database: config.get<string>('DATABASE_NAME', 'prac'),
        entities: [FilmEnt, ScheduleEnt],
        // synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [OrderController],
  providers: [configProvider, OrderService],
})
export class AppModule {}
