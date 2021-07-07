import mongoose from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
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

userSchema.virtual('lessons-player', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'player'
});

userSchema.virtual('lessons-coach', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'coach'
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

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
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    return token;
}

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await argon2.hash(user.password);
    }

    next();
});

const User = mongoose.model('User', userSchema);

export default User;