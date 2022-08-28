"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const session = require("express-session");
const passport = require("passport");
const session_entity_1 = require("./auth/session.entity");
const out_1 = require("connect-typeorm/out");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const sessionRepository = app
        .get(app_module_1.AppModule)
        .getDataSource()
        .getRepository(session_entity_1.TypeOrmSession);
    app.use(session({
        cookie: {
            maxAge: 86400000,
        },
        secret: 'edsdsjdhsjksknzsnddjskdnsjkslqlz',
        resave: false,
        saveUninitialized: false,
        store: new out_1.TypeormStore({
            cleanupLimit: 2,
            limitSubquery: false,
            ttl: 86400,
        }).connect(sessionRepository)
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map