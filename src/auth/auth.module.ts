// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtModule } from './jwt.module';


@Module({
  imports: [
    PassportModule, // 导入 PassportModule
    UserModule, // 导入 UsersModule 以使用 UserService
    JwtModule, // 导入 JwtModule
  ],
  // providers: [AuthService], // 提供 AuthService 和 JwtStrategy
  providers: [AuthService, JwtAuthGuard], // 确保 JwtAuthGuard 也被提供
  controllers: [AuthController],
  exports: [AuthService], // 导出 AuthService 以便在其他模块中使用
})
export class AuthModule {}