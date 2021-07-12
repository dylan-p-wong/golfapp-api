import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql"
import { LessonType, SwingType } from "../../common/types"
import { authorization } from "../../../utils/authorization"
import { getLessonResolve, getUserPlayerLessonsResolve, getUserCoachLessonsResolve, getLessonSwingsResolve, getLessonAnalysesResolve } from "./lesson-resolvers"

const lessonQueries = {
    getLesson: {
        type: LessonType,
        args: {
            lessonId: {
                type: GraphQLString
            }
        },
        resolve: (obj, args, context) => {
            return authorization(getLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserPlayerLessons: {
        type: GraphQLList(LessonType),
        resolve: (obj, args, context) => {
            return authorization(getUserPlayerLessonsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserCoachLessons: {
        type: GraphQLList(LessonType),
        resolve: (obj, args, context) => {
            return authorization(getUserCoachLessonsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getLessonSwings: {
        type: GraphQLList(SwingType),
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(getLessonSwingsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getLessonAnalyses: {
        type: GraphQLList(SwingType),
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(getLessonAnalysesResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { lessonQueries }