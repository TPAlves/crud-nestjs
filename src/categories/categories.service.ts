import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  // DTO - Data Transfer Object
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return (
      this.prisma.category.findUnique({
        where: {
          id,
        },
      }) || null
    );
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return (
      this.prisma.category.update({
        where: {
          id,
        },
        data: {
          ...updateCategoryDto, // Operador de espalhamento (...) realiza uma cópia de todo objeto
          updatedAt: new Date(),
        },
      }) || null
    );
  }

  remove(id: number) {
    return (
      this.prisma.category.delete({
        where: {
          id,
        },
      }) || null
    );
  }
}
