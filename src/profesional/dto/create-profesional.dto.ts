import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProfesionalDto {

    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    identityDocument: string;

}
