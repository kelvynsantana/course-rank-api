import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  school: string;
}
