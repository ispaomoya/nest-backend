import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      secret: 'yiyi577', // 替换为你的密钥
      signOptions: { expiresIn: '60m' }, // 设置过期时间
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}