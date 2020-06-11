import { Inject, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { AuthenticateDTO } from '../../dto/Authentication/AuthenticateDTO';
import { RegisterDTO } from '../../dto/Authentication/RegisterDTO';
import { User } from '../../models/Authentication/User';
import { UserToken } from '../../models/Authentication/UserToken';

@Service()
export class AuthenticationService {
    constructor(
        @Inject(User) private readonly userModel: MongooseModel<User>,
        @Inject(UserToken) private readonly userToken: MongooseModel<UserToken>
    ) {}

    public async getUserByToken(token: string): Promise<User|null> {
        try {
            const userToken: UserToken = await this.userToken.findOne({
                token,
            }).populate('user').exec();

            return userToken?.user as User;
        } catch (e) {
            return null;
        }
    }

    public async authenticate(user: AuthenticateDTO): Promise<UserToken|null> {
        try {
            const account: User = await this.userModel.findOne({
                email: user.email
            }).exec();

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
                ...user
            } as User).save();
        } catch (e) {
            // Handling
            throw e;
        }
    }
}
