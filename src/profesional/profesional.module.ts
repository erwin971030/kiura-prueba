import { Module } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Comment } from './entities/comment.entity';
import { Certificates } from './entities/certificates.entity';

@Module({
  controllers: [ProfesionalController],
  providers: [ProfesionalService],
  imports: [
    TypeOrmModule.forFeature([ Profesional, Comment, Certificates ]),
    AuthModule
  ],
  exports: [
    ProfesionalService,
    TypeOrmModule
  ]
})
export class ProfesionalModule {}
