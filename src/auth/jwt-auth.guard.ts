import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {
    comparePassword,
    toPost200,
    to400,
    to404,
    toGet200,
    toList200,
    to403
  } from '../tools';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    

    if (!token) {
        throw new HttpException(
          {
            message: '没有token',
            statusCode: HttpStatus.FORBIDDEN,
          },
          HttpStatus.FORBIDDEN,
        );
        // return false
      }

    try {
      const payload = this.jwtService.verify(token, {secret: 'yiyi577'});
      request.user = payload;
    } catch {
        throw new HttpException(
            {
              message: '失败token',
              statusCode: HttpStatus.FORBIDDEN,
            },
            HttpStatus.FORBIDDEN,
          );
    //   return false;
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers as any; // 转换为 any 类型
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}