import { Module } from '@nestjs/common';
import { AllScriptService } from './all-script.service';
import { AllScriptController } from './all-script.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity'; // 假设你已经创建了这个实体
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    
  ],
  providers: [AllScriptService],
  controllers: [AllScriptController]
})
export class AllScriptModule {}
