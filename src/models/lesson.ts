import mongoose, { PopulatedDoc } from 'mongoose';

interface ILesson {
    title?: string,
    swings: [PopulatedDoc<Document>],
    analyses: [PopulatedDoc<Document>],
    drills: [PopulatedDoc<Document>],
    notes: [PopulatedDoc<Document>],
    player: PopulatedDoc<Document>,
    coach: PopulatedDoc<Document>,
    isCompleted: boolean
}

const lessonSchema = new mongoose.Schema({
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
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);

export default Lesson;