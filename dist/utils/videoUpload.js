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
exports.uploadVideo = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
if (process.env.NODE_ENV !== 'PROD') {
    require('dotenv').config();
}
const s3 = new aws_sdk_1.default.S3();
const getVideoKey = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
const uploadVideo = (createReadStream) => __awaiter(void 0, void 0, void 0, function* () {
    const stored = yield s3.upload({ Bucket: process.env.AWS_BUCKET, Key: getVideoKey(), Body: createReadStream }, (err, data) => {
        if (err) {
            console.error(err);
        }
        if (data) {
            return data.Location;
        }
    }).promise();
    return stored.Location;
});
exports.uploadVideo = uploadVideo;
//# sourceMappingURL=videoUpload.js.map