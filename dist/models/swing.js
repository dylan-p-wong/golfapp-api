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
const swingSchema = new mongoose_1.default.Schema({
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
        type: String,
    },
    sideVideo: {
        type: String,
    },
    viewers: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
        }],
    player: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });
swingSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const fresh = doc.createdAt === doc.updatedAt;
        if (fresh) {
            yield notifications_1.sendNotification(doc.player, notifications_1.CREATED_SWING);
        }
        next();
    });
});
const Swing = mongoose_1.default.model('Swing', swingSchema);
exports.default = Swing;
//# sourceMappingURL=swing.js.map