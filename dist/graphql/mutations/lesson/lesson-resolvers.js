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
exports.cancelLessonRequestResolve = exports.createLessonRequestResolve = exports.addLessonToLessonRequestResolve = exports.addNoteToLessonResolve = exports.addAnalysisToLessonResolve = exports.addDrillToLessonResolve = exports.addSwingToLessonResolve = exports.createLessonResolve = void 0;
const analysis_1 = __importDefault(require("../../../models/analysis"));
const drill_1 = __importDefault(require("../../../models/drill"));
const lesson_1 = __importDefault(require("../../../models/lesson"));
const lesson_request_1 = __importDefault(require("../../../models/lesson-request"));
const note_1 = __importDefault(require("../../../models/note"));
const swing_1 = __importDefault(require("../../../models/swing"));
const user_1 = __importDefault(require("../../../models/user"));
const tiers_1 = require("../../../utils/consts/tiers");
const dates_1 = require("../../../utils/dates");
const createLessonResolve = (obj, { playerId, title }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const player = yield user_1.default.findById(playerId);
    if (!player) {
        throw new Error("Player does not exist.");
    }
    const coach = yield user_1.default.findById(context.userId);
    if (!coach) {
        throw new Error("Coach does not exist.");
    }
    yield coach.populate('lessons_coach').execPopulate();
    const tier = tiers_1.getCoachTierInfo(coach.coachTier);
    const numberOfLessonsLastMonth = dates_1.numberInLastMonth(coach.lessons_coach);
    if (numberOfLessonsLastMonth >= tier.lessonsPerMonth) {
        throw new Error("You cannot create more lessons this month.");
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
    if (swings.length >= 3) {
        throw new Error("You can only add 3 swings to a lesson.");
    }
    swings.push(swing._id);
    lesson.swings = swings;
    yield lesson.save();
    return swing;
});
exports.addSwingToLessonResolve = addSwingToLessonResolve;
const addAnalysisToLessonResolve = (obj, { analysisId, lessonId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    const analysis = yield analysis_1.default.findById(analysisId);
    const analyses = lesson.analyses;
    // if (analyses.length >= 3) {
    //     throw new Error("You can only add 3 analyses to a lesson.");
    // }
    analyses.push(analysis._id);
    lesson.analyses = analyses;
    yield lesson.save();
    return analysis;
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
const addNoteToLessonResolve = (obj, { lessonId, title, description }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_1.default.findById(lessonId);
    const newNote = new note_1.default({ title, description, user: context.userId });
    yield newNote.save();
    const notes = lesson.notes;
    notes.push(newNote._id);
    lesson.notes = notes;
    yield lesson.save();
    yield lesson.populate('notes').execPopulate();
    return newNote;
});
exports.addNoteToLessonResolve = addNoteToLessonResolve;
const createLessonRequestResolve = (obj, { note, coachId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const newLessonRequest = new lesson_request_1.default({ note, player: context.userId, coach: coachId });
    yield newLessonRequest.save();
    yield newLessonRequest.populate([{ path: 'player' }, { path: 'coach' }]).execPopulate();
    return newLessonRequest;
});
exports.createLessonRequestResolve = createLessonRequestResolve;
const addLessonToLessonRequestResolve = (obj, { lessonId, lessonRequestId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonRequest = yield lesson_request_1.default.findById(lessonRequestId);
    if (context.userId !== lessonRequest.coach.toString())
        return;
    const lesson = yield lesson_1.default.findById(lessonId);
    lessonRequest.lesson = lesson._id;
    yield lessonRequest.save();
    yield lessonRequest.populate([{ path: 'player' }, { path: 'coach' }]).execPopulate();
    return lessonRequest;
});
exports.addLessonToLessonRequestResolve = addLessonToLessonRequestResolve;
const cancelLessonRequestResolve = (obj, { lessonRequestId }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonRequest = yield lesson_request_1.default.findById(lessonRequestId);
    if (context.userId !== lessonRequest.player.toString() && context.userId !== lessonRequest.coach.toString()) {
        throw new Error("Not your lesson");
    }
    lessonRequest.isCancelled = true;
    yield lessonRequest.save();
    yield lessonRequest.populate([{ path: 'player' }, { path: 'coach' }]).execPopulate();
    return lessonRequest;
});
exports.cancelLessonRequestResolve = cancelLessonRequestResolve;
//# sourceMappingURL=lesson-resolvers.js.map