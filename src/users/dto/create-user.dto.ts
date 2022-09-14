import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional, IsString, IsUUID, Length, Matches, Validate } from "class-validator";

export class CreateUserDto {

    @IsString()
    @Length(3, 10)
    readonly login: string;

    @IsString()
    @Length(6, 20)
    readonly password: string;
    
    @IsString()
    @Matches(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4}$)/)
    readonly email: string;
}