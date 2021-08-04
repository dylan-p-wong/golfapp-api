"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const auth_queries_1 = require("./auth/auth-queries");
const swing_queries_1 = require("./swing/swing-queries");
const lesson_queries_1 = require("./lesson/lesson-queries");
const user_queries_1 = require("./user/user-queries");
const queries = Object.assign(Object.assign(Object.assign(Object.assign({}, auth_queries_1.authQueries), swing_queries_1.swingQueries), lesson_queries_1.lessonQueries), user_queries_1.userQueries);
exports.queries = queries;
//# sourceMappingURL=index.js.map