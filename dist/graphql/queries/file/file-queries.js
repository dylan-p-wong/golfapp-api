"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileQueries = void 0;
const graphql_1 = require("graphql");
const fileQueries = {
    getUserVideos: {
        type: graphql_1.GraphQLList(graphql_1.GraphQLString),
        resolve: () => "getUserVideos"
    }
};
exports.fileQueries = fileQueries;
//# sourceMappingURL=file-queries.js.map