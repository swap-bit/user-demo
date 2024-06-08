import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly address: string;

}