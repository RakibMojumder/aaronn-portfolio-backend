import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';
import { ApiResponse } from 'src/users/dto/response.dto';
import { ZodValidationPipe } from 'src/users/zod.validation.pipe';
import { CreateProjectSchema, UpdateProjectSchema } from './project.schema.zod';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(
    @Body(new ZodValidationPipe(CreateProjectSchema))
    project: Project,
  ): Promise<ApiResponse<Project>> {
    return this.projectsService.createProject(project);
  }

  @Get()
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<ApiResponse<Project>> {
    return this.projectsService.getProjectById(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateProjectSchema))
    project: Project,
  ): Promise<ApiResponse<Project>> {
    return this.projectsService.updateProject(id, project);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<ApiResponse<Project>> {
    return this.projectsService.deleteProject(id);
  }

  @Get('other-projects/:id')
  async getOtherProjects(
    @Param('id') id: string,
  ): Promise<ApiResponse<Project[]>> {
    return this.projectsService.getOtherProjects(id);
  }
}
