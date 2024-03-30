import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profesional } from "./profesional.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Certificates{
    @PrimaryGeneratedColumn()
    id?: number;

    @ApiProperty()
    @Column()
    name: string;

    @ManyToOne( () => Profesional, (profesional) => profesional.certificates )
    profesional: Profesional;
}