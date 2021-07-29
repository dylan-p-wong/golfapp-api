import { authMutations } from './auth/auth-mutations';
import { swingMutations } from './swing/swing-mutations';
import { lessonMutations } from './lesson/lesson-mutations';
import { analysisMutations } from './analysis/analysis-mutations';
import { userMutations } from './user/user-mutations';

const mutations = {
    ...authMutations,
    ...swingMutations,
    ...lessonMutations,
    ...analysisMutations,
    ...userMutations
}

export { mutations };