"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonType = exports.SwingType = exports.VideoDirectionEnumType = exports.SuccessType = void 0;
const graphql_1 = require("graphql");
const auth_types_1 = require("../queries/auth/auth-types");
const SuccessType = new graphql_1.GraphQLObjectType({
    name: 'SuccessType',
    fields: {
        success: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
exports.SuccessType = SuccessType;
const VideoDirectionEnumType = new graphql_1.GraphQLEnumType({
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
exports.VideoDirectionEnumType = VideoDirectionEnumType;
const SwingType = new graphql_1.GraphQLObjectType({
    name: 'SwingType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        date: {
            type: graphql_1.GraphQLString
        },
        title: {
            type: graphql_1.GraphQLString
        },
        note: {
            type: graphql_1.GraphQLString
        },
        frontVideo: {
            type: graphql_1.GraphQLString
        },
        sideVideo: {
            type: graphql_1.GraphQLString
        },
        player: {
            type: graphql_1.GraphQLString
        },
        owner: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.SwingType = SwingType;
const LessonType = new graphql_1.GraphQLObjectType({
    name: 'LessonType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        date: {
            type: graphql_1.GraphQLString
        },
        title: {
            type: graphql_1.GraphQLString
        },
        swings: {
            type: graphql_1.GraphQLList(SwingType)
        },
        analyses: {
            type: graphql_1.GraphQLList(SwingType)
        },
        drills: {
            type: graphql_1.GraphQLList(graphql_1.GraphQLString)
        },
        notes: {
            type: graphql_1.GraphQLList(graphql_1.GraphQLString)
        },
        player: {
            type: auth_types_1.userInfoType,
        },
        coach: {
            type: auth_types_1.userInfoType
        }
    }
});
exports.LessonType = LessonType;
//# sourceMappingURL=types.js.map