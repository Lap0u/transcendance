/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeOrmSession } from './entities/session.entity';
import { TypeormStore } from 'connect-typeorm/out';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
	allowedHeaders: ['Content-Type'],
  	origin: 'http://localhost:3000',
  	credentials: true,
  });
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
  await app.listen(4000);
}
bootstrap();
