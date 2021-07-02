import { GraphQLBoolean, GraphQLObjectType, GraphQLEnumType } from "graphql";

const SuccessType = new GraphQLObjectType({
    name: 'SuccessType',
    fields: {
        success: {
            type: GraphQLBoolean
        }
    } 
});

const VideoDirectionEnumType = new GraphQLEnumType({
    name: 'videoDirectionEnumType',
    values: {
        FRONT: {
            value: 0
        },
        BACK: {
            value: 1
        }
    }
});

export { SuccessType, VideoDirectionEnumType };