import { Required } from '@tsed/common';
import { Model, ObjectID, PreHook, Ref } from '@tsed/mongoose';
import { generateToken } from '../../Util/GenerateUtil';
import { User } from './User';

@Model()
export class UserToken {
    @ObjectID('id')
    _id: string;

    @Ref(User)
    @Required()
    user: Ref<User>

    @Required()
    token: string;

    @Required()
    lastAccessAt: Date;

    @Required()
    createdAt: Date;

    @PreHook("validate")
    static preValidate(userToken: UserToken, next) {
        console.log(userToken.token);
        if (userToken.token === undefined) {
            userToken.token = generateToken()
        }

        if (userToken.lastAccessAt === undefined) {
            userToken.lastAccessAt = new Date();
        }

        if (userToken.createdAt === undefined) {
            userToken.createdAt = new Date();
        }

        next();
    }
}
