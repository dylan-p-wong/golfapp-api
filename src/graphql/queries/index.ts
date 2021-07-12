import { fileQueries } from './file/file-queries';
import { authQueries } from './auth/auth-queries';
import { swingQueries } from './swing/swing-queries';
import { lessonQueries } from './lesson/lesson-queries';

const queries = {
    ...authQueries,
    ...fileQueries,
    ...swingQueries,
    ...lessonQueries
}

export { queries };