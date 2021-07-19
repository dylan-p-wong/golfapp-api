"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authQueries = void 0;
const graphql_1 = require("graphql");
const authorization_1 = require("../../../utils/authorization");
const auth_resolvers_1 = require("./auth-resolvers");
const auth_types_1 = require("./auth-types");
const authQueries = {
    userInfo: {
        type: auth_types_1.userInfoType,
        resolve: (obj, args, context) => {
            return authorization_1.authorization(auth_resolvers_1.userInfoResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUsers: {
        type: graphql_1.GraphQLList(auth_types_1.userInfoType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(auth_resolvers_1.getUsersResolve, {
                obj,
                args,
                context
            });
        }
    },
    getCoaches: {
        type: graphql_1.GraphQLList(auth_types_1.userInfoType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(auth_resolvers_1.getCoachesResolve, {
                obj,
                args,
                context
            });
        }
    }
};
exports.authQueries = authQueries;
//# sourceMappingURL=auth-queries.js.map