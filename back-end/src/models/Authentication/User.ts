import { Property, Required } from '@tsed/common';
import { Model, ObjectID, PreHook, Unique } from '@tsed/mongoose';
import { hash, compare } from 'bcrypt';

@Model()
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

    @PreHook("save")
    static async preSave(user: User, next) {
        if (user.password !== null) {
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
