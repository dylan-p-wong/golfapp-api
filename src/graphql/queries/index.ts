import { authQueries } from './auth/auth-queries';
import { swingQueries } from './swing/swing-queries';
import { lessonQueries } from './lesson/lesson-queries';
import { userQueries } from './user/user-queries';

const queries = {
    ...authQueries,
    ...swingQueries,
    ...lessonQueries,
    ...userQueries
}

export { queries };