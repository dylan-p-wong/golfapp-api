import { authMutations } from './auth/auth-mutations';
import { fileMutations } from './file/file-mutations';

const mutations = {
    ...authMutations,
    ...fileMutations
}

export { mutations };