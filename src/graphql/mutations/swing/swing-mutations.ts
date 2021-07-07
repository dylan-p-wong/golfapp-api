import { VideoDirectionEnumType } from '../../common/types';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { authorization } from '../../../utils/authorization';
import { addSwingResolve } from './swing-resolvers'; 

const swingMutations = {
    addSwing: {
        type: GraphQLString,
        args: {
            date: {
                type: GraphQLNonNull(GraphQLString) 
            },
            title: {
                type: GraphQLNonNull(GraphQLString) 
            },
            note: {
                type: GraphQLNonNull(GraphQLString) 
            },
            playerId: {
                type: GraphQLString
            },
            video: {
                type: GraphQLNonNull(GraphQLUpload)
            },
            direction: {
                type: VideoDirectionEnumType
            },
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