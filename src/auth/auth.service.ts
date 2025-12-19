import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. ตรวจสอบว่า Email และ Password ถูกต้องไหม
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    // ถ้าเจอ User และรหัสผ่านตรงกัน (ใช้ bcrypt เช็ค)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // ตัด field password ทิ้งก่อนส่งกลับเพื่อความปลอดภัย
      return result;
    }
    return null;
  }

  // 2. สร้าง Token (Payload คือข้อมูลที่จะฝังใน Token)
  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload), // สร้าง JWT Token
    };
  }
}