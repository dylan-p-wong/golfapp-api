import { GraphQLBoolean } from "graphql";
import { authorization } from '../../../utils/authorization';
import { userInfoResolve } from './auth-resolvers';
import { userInfoType } from './auth-types';

const authQueries = {
    userInfo: {
        type: userInfoType,
        resolve: (obj, args, context) => {
            return authorization(userInfoResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { authQueries };