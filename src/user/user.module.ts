import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // 假设你已经创建了这个实体
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtModule } from '../auth/jwt.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule
  ], // 导入 User 实体
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
})
export class UserModule {}
