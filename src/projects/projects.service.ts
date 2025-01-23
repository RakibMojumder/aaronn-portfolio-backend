import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema';
import { ApiResponse } from 'src/users/dto/response.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}

  async createProject(project: Project): Promise<ApiResponse<Project>> {
    try {
      const newProject = new this.projectModel(project);
      await newProject.save();
      return {
        success: true,
        message: 'Project created successfully',
        data: newProject,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getProjects(): Promise<ApiResponse<Project[]>> {
    try {
      const projects = await this.projectModel.find();
      return {
        success: true,
        message: 'Projects fetched successfully',
        data: projects,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getProjectById(id: string): Promise<ApiResponse<Project>> {
    try {
      const project = await this.projectModel.findById(id);
      return {
        success: true,
        message: 'Project fetched successfully',
        data: project,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateProject(
    id: string,
    project: Project,
  ): Promise<ApiResponse<Project>> {
    try {
      const updatedProject = await this.projectModel.findByIdAndUpdate(
        id,
        project,
        { new: true },
      );
      return {
        success: true,
        message: 'Project updated successfully',
        data: updatedProject,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteProject(id: string): Promise<ApiResponse<Project>> {
    try {
      const deletedProject = await this.projectModel.findByIdAndDelete(id);
      return {
        success: true,
        message: 'Project deleted successfully',
        data: deletedProject,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getOtherProjects(id: string): Promise<ApiResponse<Project[]>> {
    try {
      const projects = await this.projectModel.find({ _id: { $ne: id } });
      return {
        success: true,
        message: 'Projects fetched successfully',
        data: projects,
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
