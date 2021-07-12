import { GraphQLBoolean, GraphQLObjectType, GraphQLEnumType, GraphQLString, GraphQLList } from "graphql";
import { userInfoType } from "../queries/auth/auth-types";

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
        SIDE: {
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

const LessonType = new GraphQLObjectType({
    name: 'LessonType',
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
        swings: {
            type: GraphQLList(SwingType)
        },
        analyses: {
            type: GraphQLList(SwingType)
        },
        drills: {
            type: GraphQLList(GraphQLString)
        },
        notes: {
            type: GraphQLList(GraphQLString)
        },
        player: {
            type: userInfoType,
        },
        coach: {
            type: userInfoType
        }
    }
})

export { SuccessType, VideoDirectionEnumType, SwingType, LessonType };