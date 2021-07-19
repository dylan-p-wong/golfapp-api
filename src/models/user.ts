import mongoose, { Document, Model, PopulatedDoc } from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    swingDirection?: string,
    handicap?: string,
    isCoach?: string,
    swings?: [PopulatedDoc<Document>],
    lessons_player?: [PopulatedDoc<Document>],
    lessons_coach?: [PopulatedDoc<Document>],
    lesson_requests_player?: [PopulatedDoc<Document>],
    lesson_requests_coach?: [PopulatedDoc<Document>],
    generateAuthToken(): Promise<String>
}

interface UserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): Promise<IUser>,
}

const userSchema = new mongoose.Schema<IUser, UserModel>({
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

    return token;
}

userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await argon2.hash(user.password);
    }

    next();
});

const User = mongoose.model<IUser, UserModel> ('User', userSchema);

export default User;