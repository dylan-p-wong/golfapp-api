"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonMutations = void 0;
const graphql_1 = require("graphql");
const authorization_1 = require("../../../utils/authorization");
const lesson_resolvers_1 = require("./lesson-resolvers");
const types_1 = require("../../common/types");
const lessonMutations = {
    createLesson: {
        type: types_1.LessonType,
        args: {
            playerId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.createLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    addSwingToLesson: {
        type: graphql_1.GraphQLList(types_1.SwingType),
        args: {
            lessonId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            swingId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.addSwingToLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    addAnalysisToLesson: {
        type: graphql_1.GraphQLList(types_1.SwingType),
        args: {
            lessonId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            },
            analysisId: {
                type: graphql_1.GraphQLNonNull(graphql_1.GraphQLString)
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(lesson_resolvers_1.addAnalysisToLessonResolve, {
                obj,
                args,
                context
            });
        }
    }
};
exports.lessonMutations = lessonMutations;
//# sourceMappingURL=lesson-mutations.js.map