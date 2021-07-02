"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDirectionEnumType = exports.SuccessType = void 0;
const graphql_1 = require("graphql");
const SuccessType = new graphql_1.GraphQLObjectType({
    name: 'SuccessType',
    fields: {
        success: {
            type: graphql_1.GraphQLBoolean
        }
    }
});
exports.SuccessType = SuccessType;
const VideoDirectionEnumType = new graphql_1.GraphQLEnumType({
    name: 'videoDirectionEnumType',
    values: {
        FRONT: {
            value: 0
        },
        BACK: {
            value: 1
        }
    }
});
exports.VideoDirectionEnumType = VideoDirectionEnumType;
//# sourceMappingURL=types.js.map