/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeOrmSession } from './auth/session.entity';
import { getRepository , getConnection} from 'typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { SessionEntity } from 'nestjs-session-store';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
