/* eslint-disable prettier/prettier */
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeOrmSession } from './account/entities/session.entity';
import { TypeormStore } from 'connect-typeorm/out';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
	allowedHeaders: ['Content-Type'],
  	origin: 'http://front:3000',
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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(port, () => {
    console.log('[BACK] listen on port ', port);
  });
}
bootstrap();
