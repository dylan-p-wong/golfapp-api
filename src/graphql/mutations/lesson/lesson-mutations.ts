import { GraphQLString } from "graphql";

const lessonMutations = {
    createLesson: {
        args: {
            playerId: {
                type: GraphQLString
            }
        }
    }
}