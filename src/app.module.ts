import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataBase } from '../data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { JwtModule } from './auth/jwt.module';
import { AllScriptModule } from './all-script/all-script.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataBase),
    UserModule,
    AuthModule,
    JwtModule,
    AllScriptModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
],
})
export class AppModule {}
