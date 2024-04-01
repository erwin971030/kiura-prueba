import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto{

    @ApiProperty()
    @IsString()
    title: string;
    
    @ApiProperty()
    @IsNumber()
    starts: number;
    
    @ApiProperty()
    @IsString()
    comment: string;

    // @ApiProperty()
    // user?: User;
}