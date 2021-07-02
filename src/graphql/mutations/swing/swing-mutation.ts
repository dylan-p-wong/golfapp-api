import { VideoDirectionEnumType } from '../../common/types';
import { GraphQLUpload } from 'graphql-upload';
import { GraphQLString } from 'graphql';

const swingMutation = {
    createSwing: {
        args: {
            name: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            playerId: {
                type: GraphQLString
            }
        }
    },
    uploadSwing: {
        args: {
            direction: {
                type: VideoDirectionEnumType
            },
            video: {
                type: GraphQLUpload
            },
            swingId: {
                type: GraphQLString
            }
        }
    }
}