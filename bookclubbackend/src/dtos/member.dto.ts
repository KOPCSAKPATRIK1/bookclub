import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export default class MemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  birth_date: Date;

  gender: 'M' | 'F' | null;
}
