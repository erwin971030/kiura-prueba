import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {

    try {
      const newCategory = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(newCategory)

      return newCategory;
    } catch (error) {
      throw new InternalServerErrorException('Error al insertar!', error);
    }
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Categoria con el id "${id}" no existe.`);
    } 
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    
    const category = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto
    });
    if ( !category ) throw new NotFoundException(`Categoria con el id: ${ id } no existe.`);
    
    await this.categoryRepository.save( category );

    return category;
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Categoria con el id "${id}" no existe.`);
    } 
    await this.categoryRepository.delete(category.id);
    return "Categoria eliminada correctamente." 
  }
}
