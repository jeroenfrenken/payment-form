import { Required } from '@tsed/common';
import { Model, ObjectID, Ref } from '@tsed/mongoose';
import { User } from '../Authentication/User';

@Model({
    schemaOptions: {
        timestamps: true
    }
})
export class Project {
    @ObjectID('id')
    _id: string;

    @Ref(User)
    @Required()
    user: Ref<User>

    @Required()
    name: string;
}
