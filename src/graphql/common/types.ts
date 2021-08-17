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
            type: UserInfoType
        },
        owner: {
            type: UserInfoType
        },
        createdAt: {
            type: GraphQLString
        },
        updatedAt: {
            type: GraphQLString
        },
        isPublic: {
            type: GraphQLBoolean
        }
    }
});

const AnalysisType = new GraphQLObjectType({
    name: 'AnalysisType',
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
        voice: {
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
        },
        isCompleted: {
            type: GraphQLBoolean
        },
        isPublic: {
            type: GraphQLBoolean
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

const PlayerTierInfoType = new GraphQLObjectType({
    name: 'PlayerTierType',
    fields: {
        tier: {
            type: GraphQLString
        },
        swingUploadsPerMonth: {
            type: GraphQLInt
        },
        swingsThisMonth: {
            type: GraphQLInt
        }
    }
});

const CoachTierInfoType = new GraphQLObjectType({
    name: 'CoachTierType',
    fields: {
        tier: {
            type: GraphQLString
        },
        lessonsPerMonth: {
            type: GraphQLInt
        },
        lessonsThisMonth: {
            type: GraphQLInt
        }
    }
});

const TierInfoType = new GraphQLObjectType({
    name: 'TierInfoType',
    fields: {
        coachTier: {
            type: CoachTierInfoType
        },
        playerTier: {
            type: PlayerTierInfoType
        }
    }
});

const ActivityType = new GraphQLObjectType({
    name: 'ActivityType',
    fields: {
        title: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        }
    }
})

const UserTotalsType = new GraphQLObjectType({
    name: 'UserTotalsType',
    fields: {
        totalSwings: {
            type: GraphQLInt
        },
        swingsThisMonth: {
            type: GraphQLInt
        },
        totalLessons: {
            type: GraphQLInt
        },
        lessonsThisMonth: {
            type: GraphQLInt
        },
        totalLessonsRecieved: {
            type: GraphQLInt
        },
        lessonsRecievedThisMonth: {
            type: GraphQLInt
        },
        totalStudents: {
            type: GraphQLInt
        }
    }
});

export { UserTotalsType, ActivityType, HandType, LessonRequestType, SwingType, LessonType, NoteType, TierInfoType, AnalysisType };