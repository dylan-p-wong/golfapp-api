import { fileQueries } from './file/file-queries';
import { authQueries } from './auth/auth-queries';
import { swingQueries } from './swing/swing-queries';

const queries = {
    ...authQueries,
    ...fileQueries,
    ...swingQueries
}

export { queries };