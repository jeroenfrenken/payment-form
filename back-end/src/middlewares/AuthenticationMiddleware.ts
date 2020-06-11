import { isNull } from 'lodash';
import { Unauthorized } from '@tsed/exceptions';
import { EndpointInfo, IMiddleware, Middleware, Req } from '@tsed/common';
import { User } from '../models/Authentication/User';
import { AuthenticationService } from '../services/Authentication/AuthenticationService';

export interface RequestWithUser extends Req {
    user?: User
}

@Middleware()
export class AuthenticationMiddleware implements IMiddleware {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {
    }

    public async use(
        @Req() request: RequestWithUser,
        @EndpointInfo() endpoint: EndpointInfo
    ) {
        const options = endpoint.get(AuthenticationMiddleware) || {};

        if (!isNull(request.headers.authorization)) {
            const user = await this.authenticationService.getUserByToken(request.headers.authorization);

            if (user === null) {
                throw new Unauthorized("Unauthorized");
            } else {
                request.user = user;
            }
        } else {
            throw new Unauthorized("Unauthorized");
        }
    }
}
