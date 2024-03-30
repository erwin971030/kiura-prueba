import { Comment } from '../../profesional/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

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
}
