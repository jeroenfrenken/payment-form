import { Model, ObjectID } from '@tsed/mongoose';

@Model()
export class Project {
    @ObjectID('id')
    _id: string;
}
