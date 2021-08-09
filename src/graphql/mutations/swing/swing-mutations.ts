import { SwingType } from '../../common/types';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { authorization } from '../../../utils/authorization';
import { addSwingResolve, updateSwingResolve } from './swing-resolvers'; 
import { SwingInputType } from './swing-input-types';

const swingMutations = {
    addSwing: {
        type: SwingType,
        args: {
            note: {
                type: GraphQLNonNull(GraphQLString) 
            },
            playerId: {
                type: GraphQLString
            },
            frontVideo: {
                type: GraphQLUpload
            },
            sideVideo: {
                type: GraphQLUpload
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addSwingResolve, {
                obj,
                args,
                context
            });
        }
    },
    updateSwing: {
        type: SwingType,
        args: {
            swingId: {
                type: GraphQLNonNull(GraphQLString)
            },
            info: {
                type: SwingInputType
            }
        },
        resolve: (obj, args, context) => {
            return authorization(updateSwingResolve, {
                obj,
                args,
                context
            });
        }
    },
}

export { swingMutations };