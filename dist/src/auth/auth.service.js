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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const tools_1 = require("../tools");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(data) {
        const { phone, pwd } = data;
        const user = await this.userService.findOneOrder({ phone }, true);
        if (!user)
            return (0, tools_1.to404)('用户不存在');
        const { pwd: hashPwd, deletedAt } = user.data;
        if (deletedAt)
            return (0, tools_1.to404)('用户不存在');
        const boo = await (0, tools_1.comparePassword)(pwd, hashPwd);
        if (!boo)
            return (0, tools_1.to400)('密码错误');
        const token = this.jwtService.sign({ sub: user.id, phone }, { secret: 'yiyi577' });
        delete user.data.pwd;
        return (0, tools_1.toGet200)({
            token,
            user: { ...user.data },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map