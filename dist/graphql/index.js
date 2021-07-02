"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const index_1 = require("./mutations/index");
const index_2 = require("./queries/index");
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: 'Query',
        fields: index_2.queries
    }),
    mutation: new graphql_1.GraphQLObjectType({
        name: 'Mutation',
        fields: index_1.mutations
    })
});
exports.schema = schema;
//# sourceMappingURL=index.js.map