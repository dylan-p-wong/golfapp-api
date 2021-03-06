import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { authorization } from "../../../utils/authorization";
import { createLessonResolve, addSwingToLessonResolve, addAnalysisToLessonResolve, addNoteToLessonResolve, createLessonRequestResolve, addLessonToLessonRequestResolve, cancelLessonRequestResolve, updateLessonResolve } from "./lesson-resolvers";
import { AnalysisType, LessonRequestType, LessonType, NoteType, SwingType } from "../../common/types";
import { UserInputType } from "../user/user-input-types";
import { LessonInputType } from "./lesson-input-types";

const lessonMutations = {
    createLesson: {
        type: LessonType,
        args: {
            playerId: {
                type:  GraphQLNonNull(GraphQLString) 
            },
            title: {
                type:  GraphQLString
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
        type: SwingType,
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
        type: AnalysisType,
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
    },
    addNoteToLesson: {
        type: NoteType,
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            },
            title: {
                type: GraphQLNonNull(GraphQLString) 
            },
            description: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addNoteToLessonResolve, {
                obj,
                args,
                context
            });
        }
    },
    createLessonRequest: {
        type: LessonRequestType,
        args: {
            note: {
                type: GraphQLString
            },
            coachId: {
                type: GraphQLString
            }
        },
        resolve: (obj, args, context) => {
            return authorization(createLessonRequestResolve, {
                obj,
                args,
                context
            });
        }
    },
    addLessonToLessonRequest: {
        type: LessonRequestType,
        args: {
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            },
            lessonRequestId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(addLessonToLessonRequestResolve, {
                obj,
                args,
                context
            });
        }
    },
    cancelLessonRequest: {
        type: LessonRequestType,
        args: {
            lessonRequestId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(cancelLessonRequestResolve, {
                obj,
                args,
                context
            });
        }
    },
    updateLessonResolve: {
        type: LessonType,
        args: {
            info: {
                type: LessonInputType
            },
            lessonId: {
                type: GraphQLNonNull(GraphQLString) 
            }
        },
        resolve: (obj, args, context) => {
            return authorization(updateLessonResolve, {
                obj,
                args,
                context
            });
        }
    }
}

export { lessonMutations };