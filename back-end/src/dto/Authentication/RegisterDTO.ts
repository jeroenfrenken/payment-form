import { Property } from '@tsed/common';

export class RegisterDTO {
    @Property()
    firstName: string;

    @Property()
    lastName: string;

    @Property()
    email: string;

    @Property()
    password: string;
}
