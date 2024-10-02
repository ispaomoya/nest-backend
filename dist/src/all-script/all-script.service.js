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
exports.AllScriptService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const tools_1 = require("../tools");
const mork_1 = require("../mork");
let AllScriptService = class AllScriptService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async runScript() {
        const arr = [];
        for (let i = 0; i < 15; i++) {
            const random10DigitNumber = Math.floor(1000000000 + Math.random() * 9000000000);
            const random9DigitNumber = Math.floor(100000000 + Math.random() * 900000000);
            const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
            const random2DigitNumber = Math.floor(10 + Math.random() * 90);
            const random0or1 = Math.round(Math.random());
            function getRandomNameOrConcat(names) {
                const randomNumber = Math.floor(Math.random() * 900) + 100;
                if (randomNumber % 2 === 1) {
                    const randomIndex = Math.floor(Math.random() * names.length);
                    return names[randomIndex];
                }
                else {
                    const randomIndex1 = Math.floor(Math.random() * names.length);
                    let randomIndex2 = Math.floor(Math.random() * names.length);
                    while (randomIndex1 === randomIndex2) {
                        randomIndex2 = Math.floor(Math.random() * names.length);
                    }
                    const randomSymbols = ['+', '|', '，', '。', '—', '_', '(', ')', '!', '.', '#', '$', '%', '^', '&', '*', '~', '<', '>', '?', '、'];
                    const numSymbols = Math.floor(Math.random() * 20) + 1;
                    return names[randomIndex1] + randomSymbols[numSymbols] + names[randomIndex2];
                }
            }
            const name = getRandomNameOrConcat(mork_1.nameArr);
            function generateRandomString() {
                const length = Math.floor(Math.random() * 5) + 6;
                let result = '';
                const characters = 'abcdefghijklmnopqrstuvwxyz';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    result += characters[randomIndex];
                }
                return result;
            }
            const emailSuffixes = [
                '@gmail.com',
                '@yahoo.com',
                '@hotmail.com',
                '@outlook.com',
                '@aol.com',
                '@icloud.com',
                '@qq.com',
                '@163.com',
                '@sina.com',
                '@foxmail.com',
                '@msn.com',
                '@mail.ru',
                '@yandex.com',
                '@protonmail.com',
                '@zoho.com',
                '@tutanota.com',
                '@gmx.com',
                '@yahoo.co.jp',
                '@naver.com',
                '@daum.net'
            ];
            function getRandomEmailSuffix() {
                const randomIndex = Math.floor(Math.random() * emailSuffixes.length);
                return emailSuffixes[randomIndex];
            }
            const email = (random4DigitNumber % 2 == 0 ? generateRandomString() : random4DigitNumber + generateRandomString()) + getRandomEmailSuffix();
            arr.push(await this.usersRepository.create({
                name,
                email,
                "pwd": '$5$7#23$2b$10$wfwZ53Atn7IvNaKduvOxkOSxM7r24abD41eDCw25hmcoIgxCcSR2W',
                "phone": Number('1' + '' + random10DigitNumber),
                "sex": random0or1,
                "age": random2DigitNumber,
                "address": mork_1.addressArr[random2DigitNumber],
                "role": (random2DigitNumber % 8 === 0 ? 'admin' : 'user'),
                "avatar": mork_1.imgArr[random2DigitNumber],
                "text": mork_1.textArr[random2DigitNumber],
                "orderId": random9DigitNumber
            }));
        }
        const a = await Promise.all(arr);
        a.forEach(async (item) => {
            await this.usersRepository.save(item);
        });
        console.log('done');
        return (0, tools_1.toPost200)();
    }
};
exports.AllScriptService = AllScriptService;
exports.AllScriptService = AllScriptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AllScriptService);
//# sourceMappingURL=all-script.service.js.map