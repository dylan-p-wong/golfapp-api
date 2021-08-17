import { GraphQLBoolean, GraphQLList, GraphQLString } from "graphql";
import { authorization } from '../../../utils/authorization';
import { userInfoResolve, getUsersResolve, getCoachesResolve } from './auth-resolvers';
import { UserInfoType } from "../../common/types";

const authQueries = {
    userInfo: {
        type: UserInfoType,
        args: {
            _id: {
                type: GraphQLString
            }
        },
        resolve: (obj, args, context) => {
            return authorization(userInfoResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUsers: {
        type: GraphQLList(UserInfoType),
        resolve: (obj, args, context) => {
            return authorization(getUsersResolve, {
                obj,
                args,
                context
            });
        }
    },
    getCoaches: {
        type: GraphQLList(UserInfoType),
        resolve: (obj, args, context) => {
            return authorization(getCoachesResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { authQueries };