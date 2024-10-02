import { Controller, Get, Post, Body, Param, Query, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto'; // 假设你已经创建了这个 DTO
import { Public } from '../common/public.decorator';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/b/api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @Public()
    @HttpCode(200)
  async login(@Body() loginDto: AuthDto) {
    const res = await this.authService.login(loginDto)
    
    return res
    
  }
}
