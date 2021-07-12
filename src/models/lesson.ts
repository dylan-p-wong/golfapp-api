import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    date: {
        type: String
    },
    title: {
        type: String
    },
    swings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Swing'
    }],
    analyses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Analysis'
    }],
    drills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drill'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }],
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;