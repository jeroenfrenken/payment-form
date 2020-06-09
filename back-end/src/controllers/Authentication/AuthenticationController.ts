import { MongooseModel } from '@tsed/mongoose';
import { User } from '../../models/Authentication/User';
import { AuthenticateDTO } from '../../dto/Authentication/AuthenticateDTO';
import { BodyParams, Controller, Inject, Post, Required } from '@tsed/common';

@Controller('/authentication')
export class AuthenticationController {
    constructor(
        @Inject(User) private userModel: MongooseModel<User>
    ) {}


    @Post("/authenticate")
    async authenticate(
        @Required() @BodyParams() authenticateDTO: AuthenticateDTO,
    ) {

    }

    @Post("/register")
    async register(
        @Required() @BodyParams() authenticateDTO: AuthenticateDTO
    ) {
        await new this.userModel({
            email: authenticateDTO.email,
            password: authenticateDTO.password
        } as User)
            .save();
    }
}
