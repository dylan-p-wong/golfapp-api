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
exports.getUserCoachLessonRequestsResolve = exports.getUserPlayerLessonRequestsResolve = exports.getLessonNotesResolve = exports.getLessonAnalysesResolve = exports.getLessonSwingsResolve = exports.getUserCoachLessonsResolve = exports.getUserPlayerLessonsResolve = exports.getLessonResolve = void 0;
const lesson_1 = __importDefault(require("../../../models/lesson"));
const user_1 = __importDefault(require("../../../models/user"));
const getLessonResolve = (obj, { lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    yield lesson.populate([{ path: 'swings' }, { path: 'analyses' }, { path: 'drills' }]).execPopulate();
    return lesson;
});
exports.getLessonResolve = getLessonResolve;
const getUserPlayerLessonsResolve = (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(context.userId);
    yield user.populate({ path: 'lessons_player', populate: [{ path: 'player' }, { path: 'coach' }] }).execPopulate();
    return user.lessons_player;
});
exports.getUserPlayerLessonsResolve = getUserPlayerLessonsResolve;
const getUserCoachLessonsResolve = (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(context.userId);
    yield user.populate({ path: 'lessons_coach', populate: [{ path: 'player' }, { path: 'coach' }] }).execPopulate();
    return user.lessons_coach;
});
exports.getUserCoachLessonsResolve = getUserCoachLessonsResolve;
const getLessonSwingsResolve = (obj, { lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    yield lesson.populate([{ path: 'swings' }]).execPopulate();
    return lesson.swings;
});
exports.getLessonSwingsResolve = getLessonSwingsResolve;
const getLessonAnalysesResolve = (obj, { lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    yield lesson.populate([{ path: 'analyses' }]).execPopulate();
    return lesson.analyses;
});
exports.getLessonAnalysesResolve = getLessonAnalysesResolve;
const getLessonNotesResolve = (obj, { lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    yield lesson.populate([{ path: 'notes' }]).execPopulate();
    return lesson.notes;
});
exports.getLessonNotesResolve = getLessonNotesResolve;
const getUserPlayerLessonRequestsResolve = (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(context.userId);
    yield user.populate({ path: 'lesson_requests_player', populate: [{ path: 'player' }, { path: 'coach' }] }).execPopulate();
    return user.lesson_requests_player;
});
exports.getUserPlayerLessonRequestsResolve = getUserPlayerLessonRequestsResolve;
const getUserCoachLessonRequestsResolve = (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(context.userId);
    yield user.populate({ path: 'lesson_requests_coach', populate: [{ path: 'player' }, { path: 'coach' }] }).execPopulate();
    return user.lesson_requests_coach;
});
exports.getUserCoachLessonRequestsResolve = getUserCoachLessonRequestsResolve;
//# sourceMappingURL=lesson-resolvers.js.map