import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// สร้าง Class สำหรับรับค่า Login
class LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    // 1. ตรวจสอบ Email/Password
    const user = await this.authService.validateUser(body.email, body.password);
    
    // 2. ถ้าไม่ถูกต้อง ให้แจ้ง Error
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // 3. ถ้าถูกต้อง ให้สร้าง Token ส่งกลับไป
    return this.authService.login(user);
  }
}