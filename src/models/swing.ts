import mongoose, { Document, PopulatedDoc } from 'mongoose';
import { CREATED_SWING, sendNotification } from '../utils/notifications';

interface ISwing extends Document {
    date: string,
    title: string,
    note: string,
    frontVideo?: string,
    sideVideo?: string,
    viewers: [string],
    player: PopulatedDoc<Document>,
    owner: PopulatedDoc<Document>,
    isPublic: boolean
}

const swingSchema = new mongoose.Schema({
    date: {
        type: String
    },
    title: {
        type: String
    },
    note: {
        type: String
    },
    frontVideo: {
        type: String,
    },
    sideVideo: {
        type: String,
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

swingSchema.post("save", async function(doc, next) {
    const fresh = doc.createdAt === doc.updatedAt;
    
    if (fresh) {
        await sendNotification(doc.player, CREATED_SWING);
    }

    next();
});

const Swing = mongoose.model<ISwing>('Swing', swingSchema);

export default Swing;