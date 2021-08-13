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
const mongoose_1 = __importDefault(require("mongoose"));
const notifications_1 = require("../utils/notifications");
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
lessonSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fresh = doc.createdAt === doc.updatedAt;
        if (fresh) {
            yield notifications_1.sendNotification(doc.coach, notifications_1.CREATED_LESSON, doc.player);
        }
        next();
    });
});
lessonSchema.post("findOneAndUpdate", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc.isCompleted) {
            yield notifications_1.sendNotification(doc.player, notifications_1.COMPLETED_LESSON, doc.coach);
        }
    });
});
const Lesson = mongoose_1.default.model('Lesson', lessonSchema);
exports.default = Lesson;
//# sourceMappingURL=lesson.js.map