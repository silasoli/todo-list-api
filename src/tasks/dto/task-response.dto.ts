import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../schemas/task.entity';

export class TaskResponseDto {
  constructor(task: Task) {
    const { _id, description, createdAt, updatedAt } = task;

    return { _id: String(_id), description, createdAt, updatedAt };
  }

  @ApiProperty({ required: true })
  _id: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  createdAt: Date;

  @ApiProperty({ required: true })
  updatedAt: Date;
}
