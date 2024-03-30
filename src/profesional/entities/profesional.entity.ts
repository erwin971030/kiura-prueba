import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { Certificates } from "./certificates.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Profesional {

    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    photo: string;

    @Column('varchar', { unique: true })
    identityDocument: string;

    @Column('boolean', {default: false})
    isAccepted: boolean;

    @OneToMany( () => Comment, (comment) => comment.profesional, { cascade: true} )
    comments: Comment[];

    @OneToMany( () => Certificates, (cerfiticates) => cerfiticates.profesional, { cascade: true} )
    certificates: Certificates[];
}
