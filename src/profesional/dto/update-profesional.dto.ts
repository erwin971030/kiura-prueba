import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesionalDto } from './create-profesional.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfesionalDto extends PartialType(CreateProfesionalDto) {
    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    identityDocument: string;
}
