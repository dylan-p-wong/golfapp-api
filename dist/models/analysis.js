"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const analysisSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    frontVideo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Video'
    },
    sideVideo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Video'
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    }
});
const Analysis = mongoose_1.default.model('Analysis', analysisSchema);
exports.default = Analysis;
//# sourceMappingURL=analysis.js.map