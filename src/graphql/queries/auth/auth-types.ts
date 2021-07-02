import { GraphQLEnumType, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const swingDirectionEnumType = new GraphQLEnumType({
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

export const userInfoType = new GraphQLObjectType({
    name: 'userInfoType',
    fields: {
        email: {
            type: GraphQLString
        },
        firstname: {
            type: GraphQLString
        },
        lastname: {
            type: GraphQLString
        },
        swingDirection: {
            type: swingDirectionEnumType
        },
        handicap: {
            type: GraphQLInt
        }
    }
});