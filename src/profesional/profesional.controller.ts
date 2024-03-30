import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { CreateProfesionalDto } from './dto/create-profesional.dto';
import { UpdateProfesionalDto } from './dto/update-profesional.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profesinal')
@Controller('profesional')
export class ProfesionalController {
  constructor(private readonly profesionalService: ProfesionalService) {}

  @Auth()
  @Post()
  create(@Body() createProfesionalDto: CreateProfesionalDto, @GetUser() user: User) {
    return this.profesionalService.create(createProfesionalDto);
  }

  @Get()
  findAll() {
    return this.profesionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesionalService.findOne(+id);
  }

  @Patch(':id')
  @Auth( ValidRoles.ADMINISTRADOR && ValidRoles.SOPORTE )
  update(@Param('id') id: string, @Body() updateProfesionalDto: UpdateProfesionalDto) {
    return this.profesionalService.update(+id, updateProfesionalDto);
  }

  @Auth( ValidRoles.ADMINISTRADOR && ValidRoles.SOPORTE )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesionalService.remove(+id);
  }

  @Post(':id/comment')
  addComment(@Param('id') id: string, @Body() comment: CreateCommentDto){
    return this.profesionalService.addComment(+id, comment);
  }
}
