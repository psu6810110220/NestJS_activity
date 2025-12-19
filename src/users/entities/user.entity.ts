import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// 1. สร้าง Enum สำหรับกำหนดสิทธิ์ (Admin / User) [cite: 67-70]
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  // 2. ใช้ UUID เป็น ID เพื่อความปลอดภัย (เดายากกว่าตัวเลขเรียงกัน) [cite: 74-75]
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 3. Email ต้องไม่ซ้ำกัน [cite: 76-77]
  @Column({ unique: true })
  email: string;

  // 4. Password (เดี๋ยวเราจะเข้ารหัส Hashing ในขั้นตอนต่อไป) [cite: 78-79]
  @Column()
  password: string;

  // 5. กำหนด Role โดยให้ค่าเริ่มต้นเป็น USER [cite: 80]
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}