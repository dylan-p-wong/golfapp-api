import { GraphQLList, GraphQLString } from "graphql";

const fileQueries = {
    getUserVideos: {
        type: GraphQLList(GraphQLString),
        resolve: () => "getUserVideos"
    }
}

export { fileQueries };