import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({nullable: true})
    age?: number;

    @ApiProperty()
    @Column({default: ''})
    username: string;

    @ApiProperty()
    @Column({default: ''})
    password: string;
}