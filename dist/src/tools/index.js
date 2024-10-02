"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to403 = exports.to404 = exports.to400 = exports.toPost200 = exports.toGet200 = exports.toList200 = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const hashPassword = async (password, saltRounds = 10, pepper = '') => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password + pepper, salt);
    return `$5$7#23${hashedPassword}`;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword, pepper = '') => {
    if (!hashedPassword.startsWith('$5$7#23')) {
        throw new Error('哈希密码无效');
    }
    const actualHashedPassword = hashedPassword.slice(7);
    const isMatch = await bcrypt.compare(password + pepper, actualHashedPassword);
    return isMatch;
};
exports.comparePassword = comparePassword;
const toList200 = async (total = 0, pageNum = 1, pageSize = 10, data) => {
    return {
        code: 200,
        total,
        pageNum,
        pageSize,
        data
    };
};
exports.toList200 = toList200;
const toGet200 = async (data) => {
    return {
        code: 200,
        data
    };
};
exports.toGet200 = toGet200;
const toPost200 = async () => {
    return {
        code: 200,
        message: '操作成功'
    };
};
exports.toPost200 = toPost200;
const to400 = async (message = '') => {
    throw new common_1.HttpException(message ? '报错:' + message : '请求参数错误', common_1.HttpStatus.BAD_REQUEST);
};
exports.to400 = to400;
const to404 = async (message = '') => {
    throw new common_1.HttpException(message ? message : '没有权限', common_1.HttpStatus.NOT_FOUND);
};
exports.to404 = to404;
const to403 = async () => {
    throw new common_1.HttpException('403', common_1.HttpStatus.FORBIDDEN);
};
exports.to403 = to403;
//# sourceMappingURL=index.js.map