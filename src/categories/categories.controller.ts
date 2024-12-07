import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    const existsCategory = await this.categoriesService.findOne(+id);
    notFoundValidation(existsCategory);
    return existsCategory;
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const existsCategory = await this.categoriesService.findOne(id);
    notFoundValidation(existsCategory);
    const categoryUpdated = this.categoriesService.update(
      id,
      updateCategoryDto,
    );
    return categoryUpdated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    const existsCategory = await this.categoriesService.findOne(id);
    notFoundValidation(existsCategory);
    this.categoriesService.remove(id);
    return `[${(await existsCategory).id}] - ${(await existsCategory).name} deletado com sucesso!"`;
  }
}

function notFoundValidation(existsCategory) {
  if (!existsCategory) {
    throw new NotFoundException(
      'Categoria não localizada, verifique o ID e tente novamente.',
    );
  }
}
