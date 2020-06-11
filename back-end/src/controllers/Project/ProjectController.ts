import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Req,
    Required,
    UseAuth
} from '@tsed/common';
import { CustomAuth } from '../../decorators/CustomAuth';
import { ProjectDTO } from '../../dto/Project/ProjectDTO';
import { AuthenticationMiddleware, RequestWithUser } from '../../middlewares/AuthenticationMiddleware';
import { ProjectService } from '../../services/Project/ProjectService';

@Controller("/project")
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {
    }

    @Post("")
    @CustomAuth({ role: 'user' })
    async createProject(
        @Req() request: RequestWithUser,
        @Required() @BodyParams() projectDto: ProjectDTO
    ) {
        const project = await this.projectService.createProject(projectDto, request.user);

        return {
            err: project === null,
            project
        }
    }

    @Get("")
    @CustomAuth({ role: 'user' })
    async getAll(
        @Req() request: RequestWithUser
    ) {
        const projects = await this.projectService.findAllByUser(request.user);

        return {
            err: false,
            projects: projects.length > 0 ? projects : []
        }
    }

    @Get("/:id")
    @CustomAuth({ role: 'user' })
    async get(
        @Req() request: RequestWithUser,
        @Required() @PathParams("id") id: string
    ) {

    }

    @Put("/:id")
    @CustomAuth({ role: 'user' })
    async update(
        @Req() request: RequestWithUser,
        @Required() @PathParams("id") id: string,
        @Required() @BodyParams() projectDto: ProjectDTO
    ) {
       const project = await this.projectService.updateProject(projectDto, request.user);

        return {
            err: project === null,
            project
        }
    }

    @Delete("/:id")
    async delete(
        @Req() request: RequestWithUser,
        @Required() @PathParams("id") id: string
    ) {
        return {
            err: !await this.projectService.deleteProject(id, request.user)
        }
    }
}
