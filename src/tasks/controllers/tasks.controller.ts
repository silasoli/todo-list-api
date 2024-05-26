import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IDQueryDTO } from '../dto/id-param.dto';
import { Task } from '../schemas/task.entity';
import { TaskResponseDto } from '../dto/task-response.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Criar task.' })
  @ApiResponse({
    status: 201,
    description: 'Task criada com sucesso',
    type: TaskResponseDto,
  })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  create(@Body() dto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.tasksService.create(dto);
  }

  @ApiOperation({ summary: 'Buscar tasks.' })
  @ApiResponse({
    status: 200,
    description: 'Listagem de tasks retornada com sucesso',
    type: [TaskResponseDto],
  })
  @Get()
  findAll(): Promise<TaskResponseDto[]> {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Excluir tasks.' })
  @ApiResponse({
    status: 204,
    description: 'Tasks excluidas com sucesso.',
  })
  @HttpCode(204)
  @Delete()
  deleteMany(): Promise<void> {
    return this.tasksService.deleteMany();
  }

  @ApiOperation({ summary: 'Buscar task por ID.' })
  @ApiResponse({
    status: 200,
    description: 'Task retornada com sucesso',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
  })
  @Get(':id')
  findOne(@Param() params: IDQueryDTO) {
    return this.tasksService.findOne(params.id);
  }

  @ApiOperation({ summary: 'Atualizar task por ID.' })
  @ApiResponse({
    status: 200,
    description: 'Task atualizada com sucesso.',
    type: Task,
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
  })
  @ApiBody({ type: UpdateTaskDto })
  @Patch(':id')
  update(
    @Param() params: IDQueryDTO,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(params.id, dto);
  }

  @ApiOperation({ summary: 'Excluir task por ID.' })
  @ApiResponse({
    status: 204,
    description: 'Task excluida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task não encontrada',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param() params: IDQueryDTO): Promise<void> {
    return this.tasksService.deleteOne(params.id);
  }
}
