import { GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";
import { authorization } from "../../../utils/authorization";
import { ActivityType, TierInfoType, UserInfoType, UserTotalsType } from "../../common/types";
import { userCoachesResolve, userNotificationResolve, userStudentsResolve, userTierResolve, userTotalsResolve } from "./user-resolvers";

const userQueries = {
    userTier: {
        type: TierInfoType,
        resolve: (obj, args, context) => {
            return authorization(userTierResolve, {
                obj,
                args,
                context
            });
        }
    },
    userNotifications: {
        type: GraphQLList(ActivityType),
        args: {
            count: {
                type: GraphQLInt
            }
        },
        resolve: (obj, args, context) => {
            return authorization(userNotificationResolve, {
                obj,
                args,
                context
            });
        }
    },
    userTotals: {
        type: UserTotalsType,
        resolve: (obj, args, context) => {
            return authorization(userTotalsResolve, {
                obj,
                args,
                context
            });
        }
    },
    userStudents: {
        type: GraphQLList(UserInfoType),
        resolve: (obj, args, context) => {
            return authorization(userStudentsResolve, {
                obj,
                args,
                context
            });
        }
    },
    userCoaches: {
        type: GraphQLList(UserInfoType),
        resolve: (obj, args, context) => {
            return authorization(userCoachesResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { userQueries };