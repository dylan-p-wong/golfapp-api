"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const authorization = (obj, { resolve }, context) => {
    if (!context.req.cookies['test']) {
        throw new Error('testing');
    }
    context.userId = context.req.cookies['test'];
    return resolve();
};
exports.authorization = authorization;
//# sourceMappingURL=auth.js.map