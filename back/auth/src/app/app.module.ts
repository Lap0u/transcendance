/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Accounts } from '../auth/accounts.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmSession } from '../auth/session.entity';
import { DataSource } from 'typeorm';


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
	PassportModule.register({ session : true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Accounts, TypeOrmSession],
      synchronize: true,
    }),
  ],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
	getDataSource() {
		return this.dataSource;
	  }
}
