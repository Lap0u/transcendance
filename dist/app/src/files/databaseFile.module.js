"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseFileModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const files_entity_1 = require("../entities/files.entity");
const databaseFile_service_1 = require("./databaseFile.service");
let DatabaseFileModule = DatabaseFileModule_1 = class DatabaseFileModule {
};
DatabaseFileModule = DatabaseFileModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([files_entity_1.default]), DatabaseFileModule_1],
        controllers: [],
        providers: [databaseFile_service_1.DatabaseFilesService],
    })
], DatabaseFileModule);
exports.DatabaseFileModule = DatabaseFileModule;
//# sourceMappingURL=databaseFile.module.js.map