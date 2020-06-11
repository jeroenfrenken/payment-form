import { Required } from '@tsed/common';
import { Model, ObjectID, PreHook, Ref } from '@tsed/mongoose';
import { isNull } from 'lodash';
import { generateToken } from '../../Util/GenerateUtil';
import { User } from './User';

@Model({
    schemaOptions: {
        timestamps: true
    }
})
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
        if (isNull(userToken.token)) {
            userToken.token = generateToken()
        }

        if (isNull(userToken.lastAccessAt)) {
            userToken.lastAccessAt = new Date();
        }

        if (isNull(userToken.createdAt)) {
            userToken.createdAt = new Date();
        }

        next();
    }
}
