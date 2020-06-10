import { Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { ProjectDTO } from '../../dto/Project/ProjectDTO';
import { Project } from '../../models/Project/Project';

export class ProjectService {
    constructor(
        @Inject(Project) private projectModel: MongooseModel<Project>
    ) {
    }

    public createProject(projectDto: ProjectDTO): Project {
        return new Project();
    }

    public updateProject(projectDto: ProjectDTO): Project {
        return new Project();
    }

    public deleteProject(id: string): boolean {
        return false;
    }
}
