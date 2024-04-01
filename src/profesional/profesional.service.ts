import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { Profesional } from './entities/profesional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { Certificates } from './entities/certificates.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProfesionalService {
  logger: any;

  constructor(
    @InjectRepository(Profesional)
    private readonly profesionalRepository: Repository<Profesional>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Certificates)
    private readonly certificateRepository: Repository<Certificates>,
  ) { }

  async create(createProfesionalDto: CreateProfesionalDto, user: User) {
    try {
      const newprofesional = this.profesionalRepository.create({
        ...createProfesionalDto,
        user
      });

      await this.profesionalRepository.save( newprofesional )

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
    const profesional = await this.profesionalRepository
      .createQueryBuilder('profesional')
      .leftJoinAndSelect('profesional.comments', 'comments')
      .leftJoinAndSelect('profesional.certificates', 'certificates')
      .where('profesional.id = :id', { id })
      .getOne();
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
    if (!profesional) throw new NotFoundException(`Profesional con el id: ${id} no existe.`);

    await this.profesionalRepository.save(profesional);

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

  async addComment(id: number, comment: CreateCommentDto, user: User) {
    try {
      const profesional = await this.profesionalRepository.findOneBy({ id });

      if (!profesional) {
        throw new NotFoundException(`Profesional con el Id "${id}" no existe.`);
      }

      const newComment = this.commentRepository.create(comment);
      newComment.profesional = profesional;
      await this.commentRepository.save({
        ...newComment,
        user
      });

      await this.profesionalRepository.save( profesional );

      return { ...comment };

    } catch (error) {
      throw new InternalServerErrorException('Error al insertar!', error);
    }
  }

  async addCertificate(id: number, certificate: CreateCertificateDto) {
    try {
      const profesional = await this.profesionalRepository.findOneBy({ id });

      if (!profesional) {
        throw new NotFoundException(`Profesional con el Id "${id}" no existe.`);
      }

      const newCertificate = this.certificateRepository.create(certificate);
      newCertificate.profesional = profesional;
      await this.certificateRepository.save(newCertificate);

      await this.profesionalRepository.save(profesional);

      return {
        ...certificate
      };

    } catch (error) {
      throw new InternalServerErrorException('Error al insertar!', error);
    }
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
  
  async deleteAllProfesionals(){
    const query = this.profesionalRepository.createQueryBuilder('profesional');

    try {
      return await query 
        .delete()
        .where({})
        .execute();
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
}
