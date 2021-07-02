import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
    swing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Swing'
    }],
    analysis: [{
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
    },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;