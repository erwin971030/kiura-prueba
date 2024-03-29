import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ProfesionalService {

  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) { }

  async create(createProfesionalDto: CreateProfesionalDto) {
     try {
      const newprofesional = this.profesionalRepository.create(createProfesionalDto);
      await this.profesionalRepository.save(newprofesional)

      return newprofesional;
    } catch (error) {
      throw new InternalServerErrorException('Error al insertar!', error);
    }
  }

  async findAll() {
    const profesionals = await this.profesionalRepository.find();
    return profesionals;
  }

  async findOne(id: number) {
    const profesional = await this.profesionalRepository.findOneBy({ id });
    if (!profesional) {
      throw new NotFoundException(`Profesional con el id "${id}" no existe.`);
    } 
    return profesional;
  }

  async update(id: number, updateProfesionalDto: UpdateProfesionalDto) {
    const profesional = await this.profesionalRepository.preload({
      id: id,
      ...updateProfesionalDto
    });
    if ( !profesional ) throw new NotFoundException(`Profesional con el id: ${ id } no existe.`);
    
    await this.profesionalRepository.save( profesional );

    return profesional;
  }

  async remove(id: number) {
    const profesional = await this.profesionalRepository.findOneBy({ id });
    if (!profesional) {
      throw new NotFoundException(`Profesional con el id "${id}" no existe.`);
    } 
    await this.profesionalRepository.delete(profesional.id);
    return "Profesional eliminada correctamente." 
  }

  async addComment(id: number, comment: CreateCommentDto){
    const profesional = await this.profesionalRepository.findOneBy( {id} );

    if (!profesional) {
      throw new NotFoundException(`Profesional con el Id "${id}" no existe.`);
    }

    const newComment = this.commentRepository.create(comment)
    newComment.profesional = profesional;
    await this.commentRepository.save(newComment);

    profesional.comments.push(newComment);
    await this.profesionalRepository.save(profesional);

    return profesional;
  }
}
