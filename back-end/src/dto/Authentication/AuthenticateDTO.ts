import { Property } from '@tsed/common';

export class AuthenticateDTO {
    @Property()
    email: string;

    @Property()
    password: string;
}
