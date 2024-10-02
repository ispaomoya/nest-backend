import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/create-auth.dto'; // 假设你已经创建了这个 DTO
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  toPost200,
  to400,
  to404,
  toGet200,
  toList200,
} from '../tools';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService, // 注入 JwtService
    ) {}
    // 用户登录获取token
    async login(data: AuthDto): Promise<any> {
        const { phone, pwd } = data;

        const user = await this.userService.findOneOrder({phone}, true);
        if (!user) return to404('用户不存在');

        const { pwd: hashPwd, deletedAt } = user.data;

        if (deletedAt) return to404('用户不存在');

        const boo = await comparePassword(pwd, hashPwd)
        if (!boo) return to400('密码错误');

        // 生成 JWT 令牌
        const token = this.jwtService.sign({ sub: user.id, phone }, {secret: 'yiyi577'});
        // const token = ''
        delete user.data.pwd;
        
        
        return toGet200({
            token,
            user: {...user.data},
        });
      }

}
