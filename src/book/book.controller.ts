import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // เพิ่ม Endpoint พิเศษสำหรับกดไลค์
  @Patch(':id/like')
  likeBook(@Param('id') id: string) {
    return this.bookService.incrementLikes(id);
  }

  // --- CRUD เดิม (อย่าลืมลบเครื่องหมาย + ออกเหมือน Phase 2) ---
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id); // ลบ + ออก
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto); // ลบ + ออก
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id); // ลบ + ออก
  }
}