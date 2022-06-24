import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, MaxLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @IsAlphanumeric()
    @MaxLength(20)
    name: string;
}