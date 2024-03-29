import { Column, Entity, ManyToOne } from "typeorm";
import { Profesional } from "./profesional.entity";
import { User } from "src/auth/entities/user.entity";

export type CommentDocument = Comment & Document;

@Entity()
export class Comment{

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Profesional, (profesional) => profesional.comments )
    profesional: Profesional;

    @Column('varchar')
    title: string;

    @Column('integer')
    starts: number;

    @Column('varchar', {unique:true})
    comment: string;

}