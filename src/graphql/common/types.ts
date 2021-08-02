import { GraphQLInt, GraphQLBoolean, GraphQLObjectType, GraphQLEnumType, GraphQLString, GraphQLList, GraphQLFloat } from "graphql";

const HandType = new GraphQLEnumType({
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

export const UserInfoType = new GraphQLObjectType({
    name: 'UserInfoType',
    fields: {
        _id: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        firstname: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        phone: {
            type: GraphQLString
        },
        hand: {
            type: HandType
        },
        handicap: {
            type: GraphQLFloat
        },
        homeCourse: {
            type: GraphQLString
        },
        homeCourseCity: {
            type: GraphQLString
        },
        homeCourseProvince: {
            type: GraphQLString
        },
        homeCourseCountry: {
            type: GraphQLString
        },
        coachAccount: {
            type: GraphQLBoolean
        },
        playerAccount:{ 
            type: GraphQLBoolean
        },
        coachingCredentials: {
            type: GraphQLString
        },
        dateStartedCoaching: {
            type: GraphQLString
        },
        playerInfoCompleted: {
            type: GraphQLBoolean
        },
        coachInfoCompleted: {
            type: GraphQLBoolean
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }
});

const SwingType = new GraphQLObjectType({
    name: 'SwingType',
    fields: {
        _id: {
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
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
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
            type: UserInfoType,
        },
        coach: {
            type: UserInfoType
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        }
    }
});

const NoteType = new GraphQLObjectType({
    name: 'NoteType',
    fields: {
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        },
        user: {
            type: UserInfoType
        }
    }
});

const LessonRequestType = new GraphQLObjectType({
    name: 'LessonRequestType',
    fields: {
        _id: {
            type: GraphQLString
        },
        note: {
            type: GraphQLString
        },
        player: {
            type: UserInfoType
        },
        coach: {
            type: UserInfoType
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        },
        lesson: {
            type: LessonType
        },
        isCancelled: {
            type: GraphQLBoolean
        }
    }
});

export { HandType, LessonRequestType, SwingType, LessonType, NoteType };