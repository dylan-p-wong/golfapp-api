import { graphqlHTTP } from "express-graphql"
import { schema } from '../graphql/index';
import { graphqlUploadExpress } from 'graphql-upload';

const uploadGraphqlMiddleware = graphqlUploadExpress({ maxFileSize: 10000000 })

const customerGraphqlMiddleware = graphqlHTTP((req, res) => ({
    schema: schema,
    graphiql: true,
    context: (() => {
        return { req, res }
    })()
}));

export { uploadGraphqlMiddleware, customerGraphqlMiddleware }

