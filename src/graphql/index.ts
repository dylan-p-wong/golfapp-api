import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { mutations } from './mutations/index';
import { queries } from './queries/index';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

export { schema };