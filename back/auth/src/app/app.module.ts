/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Accounts } from '../auth/accounts.entity';


let envFilePath = ".env.dev";
if (process.env.ENVIRONMENT === 'PRODUCTION')
	envFilePath = '.env.prod';
if (process.env.ENVIRONMENT === 'TEST')
	envFilePath = '.env.test';
console.log(`Running on ${process.env.ENVIRONMENT} mode`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath }),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Accounts],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
