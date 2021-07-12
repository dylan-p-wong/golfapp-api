import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { authorization } from "../../../utils/authorization";
import { createLessonResolve, addSwingToLessonResolve, addAnalysisToLessonResolve } from "./lesson-resolvers";
import { LessonType, SwingType } from "../../common/types";

const lessonMutations = {
    createLesson: {
        type: LessonType,
        args: {
            playerId: {
                type:  GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(createLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    addSwingToLesson: {
        type: GraphQLList(SwingType),
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            },
            swingId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addSwingToLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    addAnalysisToLesson: {
        type: GraphQLList(SwingType),
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            },
            analysisId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addAnalysisToLessonResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { lessonMutations };