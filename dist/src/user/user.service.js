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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const tools_1 = require("../tools");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(createUserDto) {
        const user = await this.usersRepository.findOne({ where: { phone: createUserDto.phone }, withDeleted: true });
        if (user)
            return (0, tools_1.to400)('该手机号已被注册');
        const userEmail = await this.usersRepository.findOne({ where: { email: createUserDto.email }, withDeleted: true });
        if (userEmail)
            return (0, tools_1.to400)('该邮箱已存在');
        const pwd = await (0, tools_1.hashPassword)(createUserDto.pwd);
        createUserDto.pwd = pwd;
        const newUser = this.usersRepository.create(createUserDto);
        this.usersRepository.save(newUser);
        return (0, tools_1.toPost200)();
    }
    async findAll(query) {
        let { pageNum, pageSize, id, phone, email, name, orderId, sex, columnKey = 'createdAt', order = 'desc' } = query;
        pageSize = Number(pageSize ?? 10);
        pageNum = Number(pageNum ?? 1);
        const skip = (pageNum - 1) * pageSize;
        const where = {};
        if (id)
            where.id = id;
        if (phone)
            where.phone = Number(phone);
        if (email)
            where.email = email;
        if (name)
            where.name = name;
        if (orderId)
            where.orderId = Number(orderId);
        if (sex === 1 || sex === 0 || sex === '1' || sex === '0')
            where.sex = Number(sex);
        const [users, total] = await this.usersRepository.findAndCount({
            skip,
            take: pageSize,
            withDeleted: true,
            where,
            order: {
                [columnKey]: order.toUpperCase(),
            }
        });
        const data = users.map((item) => {
            delete item.pwd;
            return item;
        });
        return (0, tools_1.toList200)(total, pageNum, pageSize, data);
    }
    async findOneId(id) {
        const data = await this.usersRepository.findOne({ where: { id }, withDeleted: true });
        return (0, tools_1.toGet200)(data);
    }
    async findOneOrder(param, boo = false) {
        const data = await this.usersRepository.findOne({ where: { ...param }, withDeleted: true });
        if (!data) {
            return (0, tools_1.to404)('用户不存在');
        }
        if (data && !boo) {
            delete data.pwd;
        }
        return (0, tools_1.toGet200)(data);
    }
    async update(updateUserDto) {
        updateUserDto.orderId = Number(updateUserDto.orderId);
        updateUserDto.phone = Number(updateUserDto.phone);
        updateUserDto.sex = Number(updateUserDto.sex);
        this.usersRepository.save({ ...updateUserDto });
        return (0, tools_1.toPost200)();
    }
    async remove(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (user) {
            user.deletedAt = new Date();
            await this.usersRepository.save(user);
        }
        return (0, tools_1.toPost200)();
    }
    hardRemove(id) {
        return this.usersRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map