import mongoose, { Document, Model, PopulatedDoc } from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { FREE_TIER } from '../utils/consts/tiers';
import validator from 'validator';

interface IUser extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    hand?: string,
    handicap?: string,
    coachAccount?: boolean,
    playerAccount?: boolean,
    coachInfoCompleted: boolean,
    playerInfoCompleted: boolean,
    playerTier: string,
    coachTier: string,
    students?: [PopulatedDoc<Document>],
    coaches?: [PopulatedDoc<Document>],
    swings?: [PopulatedDoc<Document>],
    lessons_player?: [PopulatedDoc<Document>],
    lessons_coach?: [PopulatedDoc<Document>],
    lesson_requests_player?: [PopulatedDoc<Document>],
    lesson_requests_coach?: [PopulatedDoc<Document>],
    tokens: { token: string }[],
    generateAuthToken(): Promise<String>
}

interface UserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>,
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        },
    },
    phone: {
        type: String,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error("Phone is invalid")
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    hand: {
        type: String,
        enum: ['RIGHT', 'LEFT']
    },
    handicap: {
        type: Number
    },
    coachAccount: {
        type: Boolean,
        default: false
    },
    playerAccount: {
        type: Boolean,
        default: false
    },
    homeCourse: {
        type: String
    },
    homeCourseCity: {
        type: String
    },
    homeCourseCountry: {
        type: String
    },
    homeCourseProvince: {
        type: String
    },
    coachingCredentials: {
        type: String
    },
    dateStartedCoaching: {
        type: Date
    },
    playerTier: {
        type: String,
        default: FREE_TIER,
        required: true
    },
    coachTier: {
        type: String,
        default: FREE_TIER,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

userSchema.virtual('students', {
    ref: 'PlayerCoachConnection',
    localField: '_id',
    foreignField: 'coach'
});

userSchema.virtual('coaches', {
    ref: 'PlayerCoachConnection',
    localField: '_id',
    foreignField: 'player'
});

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

userSchema.virtual('playerInfoCompleted').get(function() {
    return this.hand !== undefined;
});

userSchema.virtual('coachInfoCompleted').get(function() {
    return this.coachingCredentials !== undefined && this.dateStartedCoaching !== undefined;
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user : IUser = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token: token });
    await user.save();

    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await argon2.hash(user.password);
    }

    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    
    if (this['_update'].password) {
        this['_update'].password = await argon2.hash(this['_update'].password);
    }

    next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;