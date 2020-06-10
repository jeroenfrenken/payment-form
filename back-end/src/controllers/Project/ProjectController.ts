import { BodyParams, Controller, Delete, Get, Post, Put, Required } from '@tsed/common';
import { ProjectDTO } from '../../dto/Project/ProjectDTO';
import { ProjectService } from '../../services/Project/ProjectService';

@Controller("/project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {
    }

    @Post("")
    async createProject(
        @Required() @BodyParams() projectDto: ProjectDTO
    ) {
        try {
            const project = await this.projectService.createProject(projectDto);
        } catch (e) {

        }

    }

    @Get("")
    async getAll() {

    }

    @Get("/{id}")
    async get() {

    }

    @Put("/{id}")
    async update(
        @Required() @BodyParams() projectDto: ProjectDTO
    ) {
        try {
            const project = await this.projectService.updateProject(projectDto);
        } catch (e) {

        }
    }

    @Delete("/{id}")
    async delete() {
        try {
            const delProject = await this.projectService.deleteProject("test");
        } catch (e) {

        }
    }
}
