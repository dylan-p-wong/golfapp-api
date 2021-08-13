import mongoose, { PopulatedDoc } from 'mongoose';
import { COMPLETED_LESSON, CREATED_LESSON, sendNotification } from '../utils/notifications';

interface ILesson {
    title?: string,
    swings: [PopulatedDoc<Document>],
    analyses: [PopulatedDoc<Document>],
    drills: [PopulatedDoc<Document>],
    notes: [PopulatedDoc<Document>],
    player: PopulatedDoc<Document>,
    coach: PopulatedDoc<Document>,
    isCompleted: boolean,
    isPublic: boolean
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

lessonSchema.post("save", async function(doc, next) {
    const fresh = doc.createdAt === doc.updatedAt;

    if (fresh) {
        await sendNotification(doc.coach, CREATED_LESSON, doc.player);
    }

    next();
});

lessonSchema.post("findOneAndUpdate", async function (doc, next) {
    if (doc.isCompleted) {
        await sendNotification(doc.player, COMPLETED_LESSON, doc.coach);
    }
});

const Lesson = mongoose.model<ILesson>('Lesson', lessonSchema);

export default Lesson;