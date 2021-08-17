import { GraphQLBoolean, GraphQLString } from "graphql";
import { authorization } from '../../../utils/authorization';
import { UserInfoType } from "../../common/types";
import { UserInputType } from "./user-input-types";
import { addPlayerCoachConnectionResolve, updateUserResolve } from "./user-resolvers";

const userMutations = {
    updateUser: {
        type: UserInfoType,
        args: {
            info: {
                type: UserInputType
            }
        },
        resolve: (obj, args, context) => {
            return authorization(updateUserResolve, {
                obj,
                args,
                context
            });
        }
    },
    addPlayerCoachConnection: {
        type: GraphQLBoolean,
        args: {
            playerId: {
                type: GraphQLString
            },
            coachId: {
                type: GraphQLString
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addPlayerCoachConnectionResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { userMutations };