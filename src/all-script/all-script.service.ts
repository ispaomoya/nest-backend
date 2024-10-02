import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
// import { UserService } from '../user/user.service';
import {
    hashPassword,
    toPost200,
    to400,
    to404,
    toGet200,
    toList200,
  } from '../tools';
import { nameArr, addressArr, textArr, imgArr } from 'src/mork';
@Injectable()
export class AllScriptService {
    constructor(
        @InjectRepository(User)
        // private readonly userService: UserService,
        private usersRepository: Repository<User>,
      ) {}

    // 刷数据
    async runScript() : Promise<any> {

        const arr = []
        for (let i = 0; i < 15; i++) {
            // 随机生成10位数
            const random10DigitNumber = Math.floor(1000000000 + Math.random() * 9000000000);
            const random9DigitNumber = Math.floor(100000000 + Math.random() * 900000000);
            const random4DigitNumber = Math.floor(1000 + Math.random() * 9000); 
            const random2DigitNumber = Math.floor(10 + Math.random() * 90); 
            const random0or1 = Math.round(Math.random());

            // 随机name

            function getRandomNameOrConcat(names) {
                // 生成一个三位数的随机数
                const randomNumber = Math.floor(Math.random() * 900) + 100;
            
                if (randomNumber % 2 === 1) {
                    // 如果是单数，从数组中选一个返回
                    const randomIndex = Math.floor(Math.random() * names.length);
                    return names[randomIndex];
                } else {
                    // 如果是双数，从数组中随机找两个
                    const randomIndex1 = Math.floor(Math.random() * names.length);
                    let randomIndex2 = Math.floor(Math.random() * names.length);
            
                    // 确保两个索引不同
                    while (randomIndex1 === randomIndex2) {
                        randomIndex2 = Math.floor(Math.random() * names.length);
                    }
            
                    // 随机选择1符号拼接
                    const randomSymbols = ['+', '|', '，', '。', '—', '_', '(', ')', '!', '.', '#', '$', '%', '^', '&', '*', '~', '<', '>', '?', '、'];
                    const numSymbols = Math.floor(Math.random() * 20) + 1;
            
                    // 拼接结果
                    return names[randomIndex1] + randomSymbols[numSymbols] + names[randomIndex2]
                }
            }
            const name = getRandomNameOrConcat(nameArr);
            // 随机生成6-10位数英文
            function generateRandomString() {
                const length = Math.floor(Math.random() * 5) + 6; // 随机长度从6到10
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
            
            // 随机返回一个邮箱后缀的函数
            function getRandomEmailSuffix() {
                const randomIndex = Math.floor(Math.random() * emailSuffixes.length);
                return emailSuffixes[randomIndex];
            }
            const email = (random4DigitNumber % 2 == 0 ? generateRandomString() : random4DigitNumber + generateRandomString()) + getRandomEmailSuffix();
            arr.push(
                await this.usersRepository.create({
                    name,
                    email,
                    "pwd": '$5$7#23$2b$10$wfwZ53Atn7IvNaKduvOxkOSxM7r24abD41eDCw25hmcoIgxCcSR2W',
                    "phone": Number('1' + '' + random10DigitNumber),
                    "sex": random0or1,
                    "age": random2DigitNumber,
                    "address": addressArr[random2DigitNumber],
                    "role": (random2DigitNumber % 8 === 0 ? 'admin' : 'user'),
                    "avatar": imgArr[random2DigitNumber],
                    "text": textArr[random2DigitNumber],
                    "orderId": random9DigitNumber
                })
            )
        }
        const a = await Promise.all(arr)
        a.forEach(async item => {
            await this.usersRepository.save(item);
        })

        console.log('done');
        return toPost200();
    }

}
