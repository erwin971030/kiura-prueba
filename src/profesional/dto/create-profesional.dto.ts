import { ApiProperty } from "@nestjs/swagger";

export class CreateProfesionalDto {

    @ApiProperty()
    photo: string;

    @ApiProperty()
    identityDocument: string;

    @ApiProperty( { default: false } )
    isAccepted?: boolean;

}
