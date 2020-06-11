import { Required } from '@tsed/common';
import { Model, ObjectID, PreHook, Unique } from '@tsed/mongoose';
import { hash, compare } from 'bcrypt';
import { isNull } from 'lodash';

@Model({
    schemaOptions: {
        timestamps: true
    }
})
export class User {
    @Unique()
    @ObjectID('id')
    _id: string;

    @Required()
    firstName: string;

    @Required()
    lastName: string;

    @Unique()
    @Required()
    email: string;

    @Required()
    password: string;

    @Required()
    createdAt: Date;

    @PreHook("validation")
    static preValidation(user: User, next) {
        if (isNull(user.createdAt)) {
            user.createdAt = new Date();
        }

        next();
    }

    @PreHook("save")
    static async preSave(user: User, next) {
        // TODO: check with update
        if (!isNull(user.password)) {
            try {
                user.password = await hash(user.password, 10);
            } catch (e) {
                throw e;
            }
        }
        next();
    }

    async verifyPassword(password: string) {
        return await compare(password, this.password);
    }
}
