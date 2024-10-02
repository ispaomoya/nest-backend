
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

// 生成密码哈希
export const hashPassword = async (password: string, saltRounds: number = 10, pepper: string = ''): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password + pepper, salt);
    return `$5$7#23${hashedPassword}`; // 添加前缀
  }
  

  // 验证密码
  export const comparePassword = async (password: string, hashedPassword: string, pepper: string = ''): Promise<boolean> => {
    if (!hashedPassword.startsWith('$5$7#23')) {
      throw new Error('哈希密码无效');
    }
    const actualHashedPassword = hashedPassword.slice(7); // 去掉前缀
    const isMatch = await bcrypt.compare(password + pepper, actualHashedPassword);
  
    return isMatch;
  };

  // 返回200分页数据 // data一定要是数组
export const toList200 = async (total: number = 0, pageNum: number = 1, pageSize: number = 10, data: any) => {
    return {
        code: 200,
        total,
        pageNum,
        pageSize,
        data
    }
}

// 返回非分页参数 // data一定要是对象or数组
export const toGet200 = async (data: any) => {
    return {
        code: 200,
        data
    }
}

// 返回操作成功
export const toPost200 = async () => {
    return {
        code: 200,
        message: '操作成功'
    }
}

// 返回请求参数报错
export const to400 = async (message: string = '') => {
    throw new HttpException(message ? '报错:' + message : '请求参数错误', HttpStatus.BAD_REQUEST);
}

// 返回权限报错
export const to404 = async (message: string = '') => {
    throw new HttpException(message ? message : '没有权限', HttpStatus.NOT_FOUND);
}

// 返回token报错
export const to403 = async () => {
    throw new HttpException('403', HttpStatus.FORBIDDEN);
}

