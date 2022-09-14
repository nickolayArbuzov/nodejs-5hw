import { Transform, TransformFnParams } from "class-transformer";
import { IsString, Length, Matches } from "class-validator";

export class CreateBloggerDto {
    
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsString()
    @Length(1, 15)
    readonly name: string;
    
    @IsString()
    @Length(1, 100)
    @Matches(/^(https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$)/)
    readonly youtubeUrl: string;
}

export class UpdateBloggerDto extends CreateBloggerDto {}

