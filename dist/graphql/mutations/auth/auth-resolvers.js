"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutResolve = exports.signupResolve = exports.loginResolve = void 0;
const user_1 = __importDefault(require("../../../models/user"));
const loginResolve = (obj, { email, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByCredentials(email, password);
        const token = yield user.generateAuthToken();
        context.res.cookie('client-token', token);
        return true;
    }
    catch (e) {
        console.log(e);
    }
});
exports.loginResolve = loginResolve;
const signupResolve = (obj, { email, password, firstname, lastname, playerAccount, coachAccount }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_1.default({ email, password, firstname, lastname, playerAccount, coachAccount });
        yield newUser.save();
        const token = yield newUser.generateAuthToken();
        context.res.cookie('client-token', token);
        return true;
    }
    catch (e) {
        console.log(e);
    }
});
exports.signupResolve = signupResolve;
const logoutResolve = (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        context.res.clearCookie('client-token');
    }
    catch (e) {
    }
});
exports.logoutResolve = logoutResolve;
//# sourceMappingURL=auth-resolvers.js.map