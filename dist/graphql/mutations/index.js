"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const auth_mutations_1 = require("./auth/auth-mutations");
const file_mutations_1 = require("./file/file-mutations");
const swing_mutations_1 = require("./swing/swing-mutations");
const lesson_mutations_1 = require("./lesson/lesson-mutations");
const analysis_mutations_1 = require("./analysis/analysis-mutations");
const mutations = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_mutations_1.authMutations), file_mutations_1.fileMutations), swing_mutations_1.swingMutations), lesson_mutations_1.lessonMutations), analysis_mutations_1.analysisMutations);
exports.mutations = mutations;
//# sourceMappingURL=index.js.map