import { AuthenticateDTO } from '../../dto/Authentication/AuthenticateDTO';
import { BodyParams, Controller, Post, Required } from '@tsed/common';
import { RegisterDTO } from '../../dto/Authentication/RegisterDTO';
import { AuthenticationService } from '../../services/Authentication/AuthenticationService';

@Controller('/authentication')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Post("/authenticate")
    async authenticate(
        @Required() @BodyParams() authenticateDTO: AuthenticateDTO,
    ) {
        const res = await this.authenticationService.authenticate(authenticateDTO);

        return {
            err: res === null,
            token: res?.token
        }
    }

    @Post("/register")
    async register(
        @Required() @BodyParams() registerDTO: RegisterDTO
    ) {
        const res = await this.authenticationService.createUser(registerDTO);
    }
}
