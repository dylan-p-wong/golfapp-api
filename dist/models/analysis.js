"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const analysisSchema = new mongoose_1.default.Schema({
    date: {
        type: String
    },
    title: {
        type: String
    },
    note: {
        type: String
    },
    frontVideo: {
        type: String
    },
    sideVideo: {
        type: String
    },
    voice: {
        type: String
    },
    player: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    coach: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
const Analysis = mongoose_1.default.model('Analysis', analysisSchema);
exports.default = Analysis;
//# sourceMappingURL=analysis.js.map