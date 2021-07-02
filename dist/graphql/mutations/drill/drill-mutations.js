"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../common/types");
const graphql_upload_1 = require("graphql-upload");
const graphql_1 = require("graphql");
const drillMutation = {
    createSwing: {
        args: {
            name: {
                type: graphql_1.GraphQLString
            },
            description: {
                type: graphql_1.GraphQLString
            },
            playerId: {
                type: graphql_1.GraphQLString
            }
        }
    },
    uploadDrill: {
        args: {
            direction: {
                type: types_1.VideoDirectionEnumType
            },
            video: {
                type: graphql_upload_1.GraphQLUpload
            },
            swingId: {
                type: graphql_1.GraphQLString
            }
        }
    }
};
//# sourceMappingURL=drill-mutations.js.map