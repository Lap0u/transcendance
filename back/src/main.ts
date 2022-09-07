/* eslint-disable prettier/prettier */
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeOrmSession } from './account/entities/session.entity';
import { TypeormStore } from 'connect-typeorm/out';


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	allowedHeaders: ['Content-Type'],
  	origin: 'http://localhost:3000',
  	credentials: true,
  })
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  const sessionRepository = app
  .get(AppModule)
  .getDataSource()
  .getRepository(TypeOrmSession);
  app.use(session({
	cookie: {
		maxAge : 86400000,
	},
	secret : 'edsdsjdhsjksknzsnddjskdnsjkslqlz',
	resave : false,
	saveUninitialized : false,
	store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
	}).connect(sessionRepository)
  }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(port, () => {
    console.log('[BACK] listen on port ', port);
  });
}
bootstrap();
