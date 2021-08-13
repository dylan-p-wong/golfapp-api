import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLString } from "graphql";
import { HandType } from "../../common/types";


const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    fields: {
        // firstname: {
        //     type: GraphQLString
        // },
        // lastname: {
        //     type: GraphQLString
        // },
        phone: {
            type: GraphQLString
        },
        hand: {
            type: HandType
        },
        handicap: {
            type: GraphQLFloat
        },
        homeCourse: {
            type: GraphQLString
        },
        homeCourseCity: {
            type: GraphQLString
        },
        homeCourseCountry: {
            type: GraphQLString
        },
        homeCourseProvince: {
            type: GraphQLString
        },
        coachingCredentials: {
            type: GraphQLString
        },
        dateStartedCoaching: {
            type: GraphQLFloat
        },
        password: {
            type: GraphQLString
        },
        playerAccount: {
            type: GraphQLBoolean
        },
        coachAccount: {
            type: GraphQLBoolean
        }
    }
});

export { UserInputType };