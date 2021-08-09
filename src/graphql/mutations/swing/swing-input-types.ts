import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from "graphql";

const SwingInputType = new GraphQLInputObjectType({
    name: 'SwingInputType',
    fields: {
        title: {
            type: GraphQLString
        },
        isPublic: {
            type: GraphQLBoolean
        }
    }
});

export { SwingInputType };
