import { GraphQLBoolean, GraphQLString } from "graphql";
import { loginResolve, logoutResolve, signupResolve} from './auth-resolvers';
import { authorization } from '../../../utils/authorization';

const authMutations = {
    login: {
        type: GraphQLBoolean,
        args: {
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve: loginResolve
    }, 
    signup: {
        type: GraphQLBoolean,
        args: {
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            firstname: {
                type: GraphQLString
            },
            lastname: {
                type: GraphQLString
            },
            playerAccount: {
                type: GraphQLBoolean
            },
            coachAccount: {
                type: GraphQLBoolean
            }
        },
        resolve: signupResolve
    },
    logout: {
        type: GraphQLBoolean,
        resolve: logoutResolve
    }
}

export { authMutations };