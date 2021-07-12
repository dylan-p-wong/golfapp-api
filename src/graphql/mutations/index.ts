import { authMutations } from './auth/auth-mutations';
import { fileMutations } from './file/file-mutations';
import { swingMutations } from './swing/swing-mutations';
import { lessonMutations } from './lesson/lesson-mutations';
import { analysisMutations } from './analysis/analysis-mutations';

const mutations = {
    ...authMutations,
    ...fileMutations,
    ...swingMutations,
    ...lessonMutations,
    ...analysisMutations
}

export { mutations };