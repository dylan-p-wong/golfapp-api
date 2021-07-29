"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMutations = void 0;
const graphql_1 = require("graphql");
const auth_resolvers_1 = require("./auth-resolvers");
const authMutations = {
    login: {
        type: graphql_1.GraphQLBoolean,
        args: {
            email: {
                type: graphql_1.GraphQLString
            },
            password: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: auth_resolvers_1.loginResolve
    },
    signup: {
        type: graphql_1.GraphQLBoolean,
        args: {
            email: {
                type: graphql_1.GraphQLString
            },
            password: {
                type: graphql_1.GraphQLString
            },
            firstname: {
                type: graphql_1.GraphQLString
            },
            lastname: {
                type: graphql_1.GraphQLString
            },
            playerAccount: {
                type: graphql_1.GraphQLBoolean
            },
            coachAccount: {
                type: graphql_1.GraphQLBoolean
            }
        },
        resolve: auth_resolvers_1.signupResolve
    },
    logout: {
        type: graphql_1.GraphQLBoolean,
        resolve: auth_resolvers_1.logoutResolve
    }
};
exports.authMutations = authMutations;
//# sourceMappingURL=auth-mutations.js.map