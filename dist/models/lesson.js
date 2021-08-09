"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lessonSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    swings: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Swing'
        }],
    analyses: [{
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
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
const Lesson = mongoose_1.default.model('Lesson', lessonSchema);
exports.default = Lesson;
//# sourceMappingURL=lesson.js.map