import { GraphQLString } from "graphql";
import { GraphQLUpload } from 'graphql-upload';
import { uploadVideoResolve } from './file-resolvers';
import { authorization } from '../../../utils/authorization';

const fileMutations = {
    uploadVideo: {
        type: GraphQLString,
        args: {
            video: {
                type: GraphQLUpload
            }
        },
        resolve: (obj, args, context) => {
            return authorization(uploadVideoResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { fileMutations };