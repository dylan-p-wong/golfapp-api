import { GraphQLBoolean, GraphQLObjectType, GraphQLEnumType, GraphQLString } from "graphql";

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

const SwingType = new GraphQLObjectType({
    name: 'SwingType',
    fields: {
        _id: {
            type: GraphQLString
        },
        date: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        note: {
            type: GraphQLString
        },
        frontVideo: {
            type: GraphQLString
        },
        sideVideo: {
            type: GraphQLString
        },
        player: {
            type: GraphQLString
        },
        owner: {
            type: GraphQLString
        }
    }
});

export { SuccessType, VideoDirectionEnumType, SwingType };