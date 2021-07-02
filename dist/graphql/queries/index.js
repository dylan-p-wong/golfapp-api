"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const file_queries_1 = require("./file/file-queries");
const auth_queries_1 = require("./auth/auth-queries");
const queries = Object.assign(Object.assign({}, auth_queries_1.authQueries), file_queries_1.fileQueries);
exports.queries = queries;
//# sourceMappingURL=index.js.map