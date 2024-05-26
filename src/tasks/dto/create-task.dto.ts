import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'O campo descrição deve ser uma string.' })
  @MinLength(5, { message: 'O campo descrição deve ter no mínimo 5 dígitos.' })
  description: string;
}
