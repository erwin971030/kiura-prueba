import { User } from "src/auth/entities/user.entity";
import { Profesional } from "../entities/profesional.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto{

    @ApiProperty()
    title: string;
    
    @ApiProperty()
    starts: number;
    
    @ApiProperty()
    comment: string;

    // @ApiProperty()
    // user?: User;
}