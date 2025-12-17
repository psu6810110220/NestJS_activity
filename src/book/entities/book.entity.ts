import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BookCategory } from '../../book-category/entities/book-category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  likeCount: number;

  // เชื่อมความสัมพันธ์: หนังสือหลายเล่ม อยู่ในหมวดหมู่เดียว (ManyToOne)
  @ManyToOne(() => BookCategory, (category) => category.id)
  category: BookCategory;

  @Column({ nullable: true })
  categoryId: string; // เก็บ ID หมวดหมู่ไว้ใช้อ้างอิงง่ายๆ
}