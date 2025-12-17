import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. import
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';   // 2. import

@Module({
  imports: [TypeOrmModule.forFeature([Book])],   // 3. ใส่บรรทัดนี้
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}  