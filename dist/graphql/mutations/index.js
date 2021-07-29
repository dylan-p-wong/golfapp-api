"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const auth_mutations_1 = require("./auth/auth-mutations");
const swing_mutations_1 = require("./swing/swing-mutations");
const lesson_mutations_1 = require("./lesson/lesson-mutations");
const analysis_mutations_1 = require("./analysis/analysis-mutations");
const user_mutations_1 = require("./user/user-mutations");
const mutations = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, auth_mutations_1.authMutations), swing_mutations_1.swingMutations), lesson_mutations_1.lessonMutations), analysis_mutations_1.analysisMutations), user_mutations_1.userMutations);
exports.mutations = mutations;
//# sourceMappingURL=index.js.map