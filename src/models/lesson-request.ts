import mongoose, { PopulatedDoc } from 'mongoose';

interface ILessonRequest{
    note: string,
    player: PopulatedDoc<Document>,
    coach: PopulatedDoc<Document>,
    lesson: PopulatedDoc<Document>,
}

const lessonRequestSchema = new mongoose.Schema({
    note: {
        type: String
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }
}, { timestamps: true });

const LessonRequest = mongoose.model<ILessonRequest>('LessonRequest', lessonRequestSchema);

export default LessonRequest;