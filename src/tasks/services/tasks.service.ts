import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from '../schemas/task.entity';
import { Model } from 'mongoose';
import { TaskResponseDto } from '../dto/task-response.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) { }

  public async create(dto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskModel.create(dto);

    return new TaskResponseDto(task);
  }

  public async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskModel.find().sort({ createdAt: 'asc' });

    return tasks.map((item) => new TaskResponseDto(item));
  }

  public async findOne(_id: string): Promise<Task> {
    const task = await this.taskModel.findById(_id);

    if (!task) throw new NotFoundException('Task não encontrada');

    return new TaskResponseDto(task);
  }

  public async update(_id: string, dto: UpdateTaskDto): Promise<Task> {
    await this.findOne(_id);

    await this.taskModel.updateOne({ _id }, dto);

    return this.findOne(_id);
  }

  public async deleteOne(_id: string): Promise<void> {
    await this.findOne(_id);

    await this.taskModel.deleteOne({ _id });
  }

  public async deleteMany(): Promise<void> {
    await this.taskModel.deleteMany();
  }
}
