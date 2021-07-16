"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInfoType = void 0;
const graphql_1 = require("graphql");
const swingDirectionEnumType = new graphql_1.GraphQLEnumType({
    name: 'swingDirectionEnumType',
    values: {
        RIGHT: {
            value: 0
        },
        LEFT: {
            value: 1
        }
    }
});
exports.userInfoType = new graphql_1.GraphQLObjectType({
    name: 'userInfoType',
    fields: {
        _id: {
            type: graphql_1.GraphQLString
        },
        email: {
            type: graphql_1.GraphQLString
        },
        firstname: {
            type: graphql_1.GraphQLString
        },
        lastname: {
            type: graphql_1.GraphQLString
        },
        swingDirection: {
            type: swingDirectionEnumType
        },
        handicap: {
            type: graphql_1.GraphQLInt
        }
    }
});
//# sourceMappingURL=auth-types.js.map