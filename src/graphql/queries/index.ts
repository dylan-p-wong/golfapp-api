import { authQueries } from './auth/auth-queries';
import { swingQueries } from './swing/swing-queries';
import { lessonQueries } from './lesson/lesson-queries';

const queries = {
    ...authQueries,
    ...swingQueries,
    ...lessonQueries,
}

export { queries };