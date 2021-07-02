"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const auth_mutations_1 = require("./auth/auth-mutations");
const file_mutations_1 = require("./file/file-mutations");
const mutations = Object.assign(Object.assign({}, auth_mutations_1.authMutations), file_mutations_1.fileMutations);
exports.mutations = mutations;
//# sourceMappingURL=index.js.map