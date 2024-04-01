import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@ApiBearerAuth()
@ApiTags('Profesinal')
@Controller('profesional')
export class ProfesionalController {
  constructor(private readonly profesionalService: ProfesionalService) {}

  @Auth()
  @Post()
  create(@Body() createProfesionalDto: CreateProfesionalDto, @GetUser() user: User) {
    return this.profesionalService.create(createProfesionalDto, user);
  }

  @Auth( ValidRoles.ADMINISTRADOR && ValidRoles.SOPORTE)
  @Get()
  findAll() {
    return this.profesionalService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesionalService.findOne(+id);
  }

  @Auth( ValidRoles.ADMINISTRADOR && ValidRoles.SOPORTE )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfesionalDto: UpdateProfesionalDto) {
    return this.profesionalService.update(+id, updateProfesionalDto);
  }

  @Auth( ValidRoles.ADMINISTRADOR && ValidRoles.SOPORTE )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionalService.remove(+id);
  }
  
  @Auth()
  @Post(':id/comment')
  addComment(@Param('id') id: string, @Body() comment: CreateCommentDto, @GetUser() user: User){
    return this.profesionalService.addComment(+id, comment, user);
  }

  @Auth()
  @Post(':id/certificate')
  addCertificate(@Param('id') id: string, @Body() certificate: CreateCertificateDto){
    return this.profesionalService.addCertificate(+id, certificate);
  }
}
