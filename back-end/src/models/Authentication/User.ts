import { Required } from '@tsed/common';
import { Model, ObjectID } from '@tsed/mongoose';


@Model()
export class User {
    @ObjectID('id')
    _id: string;

    @Required()
    email: string;

    @Required()
    password: string;
}
