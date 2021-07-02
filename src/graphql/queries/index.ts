import { fileQueries } from './file/file-queries';
import { authQueries } from './auth/auth-queries';

const queries = {
    ...authQueries,
    ...fileQueries
}

export { queries };