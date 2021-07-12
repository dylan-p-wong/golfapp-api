import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { authorization } from '../../../utils/authorization';
import { getSwingResolve, userSwingsResolve } from "./swing-resolvers";
import { SwingType } from '../../common/types';

const swingQueries = {
    userSwings: {
        args: {
            playerId: {
                type: GraphQLString
            }
        },
        type: GraphQLList(SwingType),
        resolve: (obj, args, context) => {
            return authorization(userSwingsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getSwing: {
        type: SwingType,
        args: {
            _id: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(getSwingResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { swingQueries };