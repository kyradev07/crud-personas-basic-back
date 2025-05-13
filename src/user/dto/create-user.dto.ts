import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @Min(1)
  age: number;

}
