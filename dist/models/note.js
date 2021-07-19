"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });
const Note = mongoose_1.default.model('Note', noteSchema);
exports.default = Note;
//# sourceMappingURL=note.js.map