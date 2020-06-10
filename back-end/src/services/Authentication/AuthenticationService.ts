import { Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { AuthenticateDTO } from '../../dto/Authentication/AuthenticateDTO';
import { RegisterDTO } from '../../dto/Authentication/RegisterDTO';
import { User } from '../../models/Authentication/User';
import { UserToken } from '../../models/Authentication/UserToken';
import { generateToken } from '../../Util/GenerateUtil';

export class AuthenticationService {
    constructor(
        @Inject(User) private userModel: MongooseModel<User>,
        @Inject(UserToken) private userToken: MongooseModel<UserToken>
    ) {
    }

    public async authenticate(user: AuthenticateDTO): Promise<UserToken|null> {
        try {
            const account: User = await this.userModel.findOne({
                email: user.email
            })

            if (await account.verifyPassword(user.password)) {
                return await new this.userToken({
                    user: account,
                } as UserToken).save();
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    public async createUser(user: RegisterDTO) {
        // Validate

        // Check if email exists


        try {
            return await new this.userModel({
                ...user,
                createdAt: new Date()
            } as User).save();
        } catch (e) {
            // Handling
            throw e;
        }
    }
}
