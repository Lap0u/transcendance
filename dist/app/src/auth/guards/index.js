"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedGuard = exports.Auth42Guard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let Auth42Guard = class Auth42Guard extends (0, passport_1.AuthGuard)('42') {
    async canActivate(context) {
        const activate = (await super.canActivate(context));
        console.log("activate", activate);
        const request = context.switchToHttp().getRequest();
        console.log("req", request);
        await super.logIn(request);
        return activate;
    }
};
Auth42Guard = __decorate([
    (0, common_1.Injectable)()
], Auth42Guard);
exports.Auth42Guard = Auth42Guard;
let AuthenticatedGuard = class AuthenticatedGuard {
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }
};
AuthenticatedGuard = __decorate([
    (0, common_1.Injectable)()
], AuthenticatedGuard);
exports.AuthenticatedGuard = AuthenticatedGuard;
//# sourceMappingURL=index.js.map