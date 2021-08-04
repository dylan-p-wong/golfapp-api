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
exports.addAnalysisResolve = void 0;
const analysis_1 = __importDefault(require("../../../models/analysis"));
const video_1 = require("../../../utils/video");
const addAnalysisResolve = (obj, { date, title, note, playerId, video1, video2, voice, direction }, context) => __awaiter(void 0, void 0, void 0, function* () {
    const ownerId = context.userId;
    if (!playerId) {
        playerId = context.userId;
    }
    if (!video1 && !video2) {
        throw new Error("You must provide at least one file!");
    }
    let video1URL;
    let video2URL;
    let voiceURL;
    if (video1) {
        const { filename, mimetype, encoding, createReadStream } = yield video1;
        video1URL = yield video_1.uploadVideo(createReadStream());
    }
    if (video2) {
        const { filename, mimetype, encoding, createReadStream } = yield video2;
        video2URL = yield video_1.uploadVideo(createReadStream());
    }
    if (voice) {
        const { filename, mimetype, encoding, createReadStream } = yield voice;
        voiceURL = yield video_1.uploadVideo(createReadStream());
    }
    const analysis = new analysis_1.default({ date, title, note, player: playerId, owner: ownerId, frontVideo: video1URL, sideVideo: video2URL, voice: voiceURL, direction });
    try {
        yield analysis.save();
        return analysis;
    }
    catch (e) {
        console.log(e);
    }
});
exports.addAnalysisResolve = addAnalysisResolve;
//# sourceMappingURL=analysis-resolvers.js.map