import { SwingType, VideoDirectionEnumType } from '../../common/types';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { authorization } from '../../../utils/authorization';
import { addSwingResolve } from './swing-resolvers'; 

const swingMutations = {
    addSwing: {
        type: SwingType,
        args: {
            title: {
                type: GraphQLNonNull(GraphQLString) 
            },
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
    }
}

export { swingMutations };