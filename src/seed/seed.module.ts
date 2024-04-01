import { Module } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { ProfesionalModule } from './../profesional/profesional.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    ProfesionalModule,
    AuthModule
  ]
})
export class SeedModule {}
