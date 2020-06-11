import { MongooseModel } from '@tsed/mongoose';
import { Inject, Service } from '@tsed/common';
import { User } from '../../models/Authentication/User';
import { Project } from '../../models/Project/Project';
import { ProjectDTO } from '../../dto/Project/ProjectDTO';

@Service()
export class ProjectService {
    constructor(
        @Inject(Project) private readonly projectModel: MongooseModel<Project>
    ) {
    }

    public async findAllByUser(user: User): Promise<Project[]> {
        return await this.projectModel.find({
            user: user._id
        }).select('-user').exec();
    }

    public async findOneByIdAndUser(id: string, user: User): Promise<Project|null> {
        return await this.projectModel.findOne({
            _id: id,
            user: user._id
        }).select('-user').exec();
    }

    public async createProject(projectDto: ProjectDTO, user: User): Promise<Project|null> {
        return await new this.projectModel({
            ...projectDto,
            user
        } as Project).save();
    }

    public async updateProject(projectDto: ProjectDTO, user: User): Promise<Project|null> {
        return new Project();
    }

    public async deleteProject(id: string, user: User): Promise<boolean> {
        return false;
    }
}
