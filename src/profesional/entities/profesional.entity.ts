import { Column, Entity, OneToMany } from "typeorm";
import { Comment } from "./comment.entity";

@Entity()
export class Profesional {

    id?: number;

    @Column()
    photo: string;

    @Column('varchar', { unique: true })
    identityDocument: string;

    @Column('array')
    certificates: string[];

    @Column('boolean', {default: false})
    isAccepted: boolean;

    @OneToMany( () => Comment, (comment) => comment.profesional, { cascade: true} )
    comments: Comment[];

}
