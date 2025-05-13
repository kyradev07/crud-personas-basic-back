import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNumber()
  @IsPositive()
  age: number;

}
