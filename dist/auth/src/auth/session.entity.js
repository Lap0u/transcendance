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
exports.TypeOrmSession = void 0;
const typeorm_1 = require("typeorm");
let TypeOrmSession = class TypeOrmSession {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], TypeOrmSession.prototype, "expiredAt", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { length: 255 }),
    __metadata("design:type", String)
], TypeOrmSession.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], TypeOrmSession.prototype, "destroyedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], TypeOrmSession.prototype, "json", void 0);
TypeOrmSession = __decorate([
    (0, typeorm_1.Entity)({ name: 'Session' })
], TypeOrmSession);
exports.TypeOrmSession = TypeOrmSession;
//# sourceMappingURL=session.entity.js.map