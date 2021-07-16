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
exports.addDrillToLessonResolve = exports.addAnalysisToLessonResolve = exports.addSwingToLessonResolve = exports.createLessonResolve = void 0;
const analysis_1 = __importDefault(require("../../../models/analysis"));
const drill_1 = __importDefault(require("../../../models/drill"));
const lesson_1 = __importDefault(require("../../../models/lesson"));
const swing_1 = __importDefault(require("../../../models/swing"));
const user_1 = __importDefault(require("../../../models/user"));
const createLessonResolve = (obj, { playerId, title }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield user_1.default.findById(playerId);
    if (!player) {
        return null;
    }
    const coach = yield user_1.default.findById(context.userId);
    if (!coach) {
        return null;
    }
    const lesson = new lesson_1.default({ player: playerId, coach: coach._id, title });
    lesson.save();
    return lesson;
});
exports.createLessonResolve = createLessonResolve;
const addSwingToLessonResolve = (obj, { swingId, lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    const swing = yield swing_1.default.findById(swingId);
    const swings = lesson.swings;
    swings.push(swing._id);
    lesson.swings = swings;
    yield lesson.save();
    yield lesson.populate('swings').execPopulate();
    return lesson.swings;
});
exports.addSwingToLessonResolve = addSwingToLessonResolve;
const addAnalysisToLessonResolve = (obj, { analysisId, lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    const analysis = yield analysis_1.default.findById(analysisId);
    const analyses = lesson.analyses;
    analyses.push(analysis._id);
    lesson.analyses = analyses;
    yield lesson.save();
    yield lesson.populate('analyses').execPopulate();
    return lesson.analyses;
});
exports.addAnalysisToLessonResolve = addAnalysisToLessonResolve;
const addDrillToLessonResolve = (obj, { drillId, lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    const drill = yield drill_1.default.findById(drillId);
    const drills = lesson.drills;
    drills.push(drill._id);
    yield lesson.save();
    yield lesson.populate('drills').execPopulate();
    return lesson.drills;
});
exports.addDrillToLessonResolve = addDrillToLessonResolve;
//# sourceMappingURL=lesson-resolvers.js.map