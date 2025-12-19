import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // ดึง Token จาก Header Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // ใส่ ! เพื่อยืนยันว่าค่านี้มีอยู่จริงใน .env
      secretOrKey: configService.get<string>('JWT_SECRET')!, 
    });
  }

  async validate(payload: any) {
    // Return ข้อมูล User เพื่อนำไปใช้ต่อใน Controller
    return { userId: payload.sub, email: payload.username, role: payload.role };
  }
}