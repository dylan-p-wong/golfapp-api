"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonQueries = void 0;
const graphql_1 = require("graphql");
const types_1 = require("../../common/types");
const authorization_1 = require("../../../utils/authorization");
const lesson_resolvers_1 = require("./lesson-resolvers");
const lessonQueries = {
    getLesson: {
        type: types_1.LessonType,
        args: {
            lessonId: {
                type: graphql_1.GraphQLString
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserPlayerLessons: {
        type: graphql_1.GraphQLList(types_1.LessonType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getUserPlayerLessonsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserCoachLessons: {
        type: graphql_1.GraphQLList(types_1.LessonType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getUserCoachLessonsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getLessonSwings: {
        type: graphql_1.GraphQLList(types_1.SwingType),
        args: {
            lessonId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getLessonSwingsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getLessonAnalyses: {
        type: graphql_1.GraphQLList(types_1.AnalysisType),
        args: {
            lessonId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getLessonAnalysesResolve, {
                obj,
                args,
                context
            });
        }
    },
    getLessonNotes: {
        type: graphql_1.GraphQLList(types_1.NoteType),
        args: {
            lessonId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getLessonNotesResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserCoachLessonRequests: {
        type: graphql_1.GraphQLList(types_1.LessonRequestType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getUserCoachLessonRequestsResolve, {
                obj,
                args,
                context
            });
        }
    },
    getUserPlayerLessonRequests: {
        type: graphql_1.GraphQLList(types_1.LessonRequestType),
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.getUserPlayerLessonRequestsResolve, {
                obj,
                args,
                context
            });
        }
    },
};
exports.lessonQueries = lessonQueries;
//# sourceMappingURL=lesson-queries.js.map