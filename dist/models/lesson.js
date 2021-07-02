"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    swing: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Swing'
        }],
    analysis: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Analysis'
        }],
    drills: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Drill'
        }],
    notes: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Note'
        }],
    player: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coach: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Lesson = mongoose_1.default.model('Lesson', lessonSchema);
exports.default = Lesson;
//# sourceMappingURL=lesson.js.map