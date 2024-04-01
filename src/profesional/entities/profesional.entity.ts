import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Certificates } from "./certificates.entity";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Profesional {

    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    photo: string;

    @ApiProperty()
    @Column('varchar', { unique: true })
    identityDocument: string;

    @ApiProperty()
    @Column('boolean', {default: false})
    isAccepted?: boolean;

    @ApiProperty()
    @OneToMany( () => Comment, (comment) => comment.profesional, { cascade: true} )
    comments: Comment[];

    @ApiProperty()
    @OneToMany( () => Certificates, (cerfiticates) => cerfiticates.profesional, { cascade: true} )
    certificates: Certificates[];

    @ManyToOne( () => User, (user) => user.profesional, { eager: true })
    user: User
}
