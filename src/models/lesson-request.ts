import mongoose, { PopulatedDoc } from 'mongoose';
import { COMPLETED_LESSON_REQUEST, sendNotification } from '../utils/notifications';

interface ILessonRequest{
    note: string,
    player: PopulatedDoc<Document>,
    coach: PopulatedDoc<Document>,
    lesson: PopulatedDoc<Document>,
    isCancelled: boolean
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
    },
    isCancelled: {
        type: Boolean
    }
}, { timestamps: true });

lessonRequestSchema.post("save", async function(doc, next) {

    const fresh = doc.createdAt === doc.updatedAt;

    if (doc.lesson && fresh) {
        await sendNotification(doc.player, COMPLETED_LESSON_REQUEST, doc.coach);
    }

    next();
});

const LessonRequest = mongoose.model<ILessonRequest>('LessonRequest', lessonRequestSchema);

export default LessonRequest;