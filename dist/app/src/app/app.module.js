"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const accounts_entity_1 = require("../entities/accounts.entity");
const passport_1 = require("@nestjs/passport");
const session_entity_1 = require("../entities/session.entity");
const typeorm_2 = require("typeorm");
const account_module_1 = require("../account/account.module");
const axios_1 = require("@nestjs/axios");
const files_entity_1 = require("../entities/files.entity");
const databaseFile_module_1 = require("../files/databaseFile.module");
let envFilePath = ".env.dev";
if (process.env.ENVIRONMENT === 'PRODUCTION')
    envFilePath = '.env.prod';
if (process.env.ENVIRONMENT === 'TEST')
    envFilePath = '.env.test';
console.log(`Running on ${process.env.ENVIRONMENT} mode`);
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    getDataSource() {
        return this.dataSource;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({ envFilePath }),
            auth_module_1.AuthModule,
            account_module_1.AccountModule,
            databaseFile_module_1.DatabaseFileModule,
            passport_1.PassportModule.register({ session: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number.parseInt(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                entities: [accounts_entity_1.Accounts, session_entity_1.TypeOrmSession, files_entity_1.default],
                synchronize: true,
            }),
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map