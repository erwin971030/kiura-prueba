import { Module } from '@nestjs/common';
import { ProfesionalService } from './profesional.service';
import { ProfesionalController } from './profesional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesional } from './entities/profesional.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProfesionalController],
  providers: [ProfesionalService],
  imports: [
    TypeOrmModule.forFeature([ Profesional, Comment ]),
    AuthModule
  ]
})
export class ProfesionalModule {}
