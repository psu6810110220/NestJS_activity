import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  // ฟีเจอร์พิเศษ: กดไลค์หนังสือ
  async incrementLikes(id: string) {
    const book = await this.repo.findOneBy({ id });
    if (book) {
      book.likeCount += 1;
      return this.repo.save(book);
    }
  }

  // --- CRUD มาตรฐาน ---
  create(createBookDto: CreateBookDto) {
    return this.repo.save(createBookDto);
  }

  findAll() {
    return this.repo.find({ relations: ['category'] }); // ดึงข้อมูลหมวดหมู่มาโชว์ด้วย
  }

  findOne(id: string) {
    return this.repo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.repo.update(id, updateBookDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}