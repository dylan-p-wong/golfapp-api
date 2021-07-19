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
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    swingDirection: {
        type: String,
        enum: ['RIGHT', 'LEFT']
    },
    handicap: {
        type: Number
    },
    isCoach: {
        type: Boolean
    }
}, { timestamps: true });
userSchema.virtual('swings', {
    ref: 'Swing',
    localField: '_id',
    foreignField: 'owner'
});
userSchema.virtual('drills', {
    ref: 'Drill',
    localField: '_id',
    foreignField: 'owner'
});
userSchema.virtual('lesson_requests_player', {
    ref: 'LessonRequest',
    localField: '_id',
    foreignField: 'player'
});
userSchema.virtual('lesson_requests_coach', {
    ref: 'LessonRequest',
    localField: '_id',
    foreignField: 'coach'
});
userSchema.virtual('lessons_player', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'player'
});
userSchema.virtual('lessons_coach', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'coach'
});
userSchema.statics.findByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = yield argon2_1.default.verify(user.password, password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
});
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = yield jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        return token;
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield argon2_1.default.hash(user.password);
        }
        next();
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map