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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const files_entity_1 = require("../entities/files.entity");
let DatabaseFilesService = class DatabaseFilesService {
    constructor(databaseFilesRepository) {
        this.databaseFilesRepository = databaseFilesRepository;
    }
    async uploadDatabaseFile(dataBuffer, filename) {
        const newFile = await this.databaseFilesRepository.create({
            filename,
            data: dataBuffer,
        });
        await this.databaseFilesRepository.save(newFile);
        return newFile;
    }
    async getFileById(id) {
        const file = await this.databaseFilesRepository.findOneBy({ id });
        if (!file) {
            throw new common_1.NotFoundException();
        }
        return file;
    }
};
DatabaseFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(files_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DatabaseFilesService);
exports.DatabaseFilesService = DatabaseFilesService;
//# sourceMappingURL=databaseFile.service.js.map