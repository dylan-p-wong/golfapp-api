"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteType = exports.LessonType = exports.SwingType = exports.LessonRequestType = exports.HandType = exports.UserInfoType = void 0;
const graphql_1 = require("graphql");
const HandType = new graphql_1.GraphQLEnumType({
    name: 'HandType',
    values: {
        RIGHT: {
            value: 'RIGHT'
        },
        LEFT: {
            value: 'LEFT'
        }
    }
});
exports.HandType = HandType;
exports.UserInfoType = new graphql_1.GraphQLObjectType({
    name: 'UserInfoType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        firstname: {
            type: graphql_1.GraphQLString
        },
        lastname: {
            type: graphql_1.GraphQLString
        },
        phone: {
            type: graphql_1.GraphQLString
        },
        hand: {
            type: HandType
        },
        handicap: {
            type: graphql_1.GraphQLFloat
        },
        homeCourse: {
            type: graphql_1.GraphQLString
        },
        homeCourseCity: {
            type: graphql_1.GraphQLString
        },
        homeCourseProvince: {
            type: graphql_1.GraphQLString
        },
        homeCourseCountry: {
            type: graphql_1.GraphQLString
        },
        coachAccount: {
            type: graphql_1.GraphQLBoolean
        },
        playerAccount: {
            type: graphql_1.GraphQLBoolean
        },
        coachingCredentials: {
            type: graphql_1.GraphQLString
        },
        dateStartedCoaching: {
            type: graphql_1.GraphQLString
        },
        playerInfoCompleted: {
            type: graphql_1.GraphQLBoolean
        },
        coachInfoCompleted: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
const SwingType = new graphql_1.GraphQLObjectType({
    name: 'SwingType',
    fields: {
        _id: {
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
        },
        createdAt: {
            type: graphql_1.GraphQLString
        },
        updatedAt: {
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
            type: exports.UserInfoType,
        },
        coach: {
            type: exports.UserInfoType
        },
        createdAt: {
            type: graphql_1.GraphQLString
        },
        updatedAt: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.LessonType = LessonType;
const NoteType = new graphql_1.GraphQLObjectType({
    name: 'NoteType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        title: {
            type: graphql_1.GraphQLString
        },
        description: {
            type: graphql_1.GraphQLString
        },
        createdAt: {
            type: graphql_1.GraphQLString
        },
        updatedAt: {
            type: graphql_1.GraphQLString
        }
    }
});
exports.NoteType = NoteType;
const LessonRequestType = new graphql_1.GraphQLObjectType({
    name: 'LessonRequestType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        note: {
            type: graphql_1.GraphQLString
        },
        player: {
            type: exports.UserInfoType
        },
        coach: {
            type: exports.UserInfoType
        },
        createdAt: {
            type: graphql_1.GraphQLString
        },
        updatedAt: {
            type: graphql_1.GraphQLString
        },
        lesson: {
            type: LessonType
        },
        isCancelled: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
exports.LessonRequestType = LessonRequestType;
//# sourceMappingURL=types.js.map