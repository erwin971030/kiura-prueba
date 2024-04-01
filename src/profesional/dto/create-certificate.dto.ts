import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCertificateDto{

    @ApiProperty()
    @IsString()
    name: string;
}