import { SwingType, VideoDirectionEnumType } from '../../common/types';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { authorization } from '../../../utils/authorization';
import { addAnalysisResolve } from './analysis-resolvers';

const analysisMutations = {
    addAnalysis: {
        type: SwingType,
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
            return authorization(addAnalysisResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { analysisMutations };