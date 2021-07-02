"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerGraphqlMiddleware = exports.uploadGraphqlMiddleware = void 0;
const express_graphql_1 = require("express-graphql");
const index_1 = require("../graphql/index");
const graphql_upload_1 = require("graphql-upload");
const uploadGraphqlMiddleware = graphql_upload_1.graphqlUploadExpress({ maxFileSize: 10000000 });
exports.uploadGraphqlMiddleware = uploadGraphqlMiddleware;
const customerGraphqlMiddleware = express_graphql_1.graphqlHTTP((req, res) => ({
    schema: index_1.schema,
    graphiql: true,
    context: (() => {
        return { req, res };
    })()
}));
exports.customerGraphqlMiddleware = customerGraphqlMiddleware;
//# sourceMappingURL=customer-middleware.js.map