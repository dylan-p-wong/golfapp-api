"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMutations = void 0;
const graphql_1 = require("graphql");
const graphql_upload_1 = require("graphql-upload");
const file_resolvers_1 = require("./file-resolvers");
const authorization_1 = require("../../../utils/authorization");
const fileMutations = {
    uploadVideo: {
        type: graphql_1.GraphQLString,
        args: {
            video: {
                type: graphql_upload_1.GraphQLUpload
            }
        },
        resolve: (obj, args, context) => {
            return authorization_1.authorization(file_resolvers_1.uploadVideoResolve, {
                obj,
                args,
                context
            });
        }
    }
};
exports.fileMutations = fileMutations;
//# sourceMappingURL=file-mutations.js.map