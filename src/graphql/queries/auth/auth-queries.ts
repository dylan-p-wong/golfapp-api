import { GraphQLBoolean, GraphQLList } from "graphql";
import { authorization } from '../../../utils/authorization';
import { userInfoResolve, getUsersResolve } from './auth-resolvers';
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
    },
    getUsers: {
        type: GraphQLList(userInfoType),
        resolve: (obj, args, context) => {
            return authorization(getUsersResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { authQueries };