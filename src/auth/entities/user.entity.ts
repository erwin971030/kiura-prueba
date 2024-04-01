import { Profesional } from 'src/profesional/entities/profesional.entity';
import { Comment } from '../../profesional/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column('varchar', {
        select: false
    })
    password: string;

    @Column('varchar')
    fullName: string;

    @Column('boolean', {
        default: true
    })
    isActive: boolean;

    @Column('varchar', {
        unique: true,
        default: 'Usuario Normal'
    })
    roles: string[];

    @OneToMany(
        () => Comment,
        ( comment ) => comment.user
    )
    comments: Comment;

    @OneToMany(
        () => Profesional,
        ( profesional ) => profesional.user
    )
    profesional: Profesional;
}
