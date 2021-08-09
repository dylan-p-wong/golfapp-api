import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from "graphql";

const LessonInputType = new GraphQLInputObjectType({
    name: 'LessonInputType',
    fields: {
        title: {
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

export { LessonInputType };
