import { authMutations } from './auth/auth-mutations';
import { fileMutations } from './file/file-mutations';
import { swingMutations } from './swing/swing-mutations';

const mutations = {
    ...authMutations,
    ...fileMutations,
    ...swingMutations
}

export { mutations };