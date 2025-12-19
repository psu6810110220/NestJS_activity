import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 1. ทำงานทันทีเมื่อโปรแกรมเริ่ม: ตรวจสอบและสร้าง Admin ถ้ายังไม่มี [cite: 100-109]
  async onModuleInit() {
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('Seeding Admin User...');
      // สร้าง Admin คนแรกของระบบ
      await this.create({
        email: 'admin@bookstore.com',
        password: 'adminpassword',
        role: UserRole.ADMIN, // ต้อง Cast type หรือแก้ DTO ให้รับ Role ได้
      } as any);
    }
  }

  // 2. สร้าง User ใหม่ พร้อมเข้ารหัส Password [cite: 112-121]
  async create(createUserDto: CreateUserDto) {
    // สร้าง Salt และ Hash รหัสผ่าน
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // สร้าง Object User และบันทึกลงฐานข้อมูล
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  // 3. ค้นหา User ด้วย Email (ใช้สำหรับ Login) [cite: 122-124]
  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }

  // เปลี่ยน id เป็น string เพราะเราใช้ UUID
  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}