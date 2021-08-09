import mongoose, { Document, PopulatedDoc } from 'mongoose';

interface ISwing extends Document {
    date: string,
    title: string,
    note: string,
    frontVideo?: string,
    sideVideo?: string,
    viewers: [string],
    player: PopulatedDoc<Document>,
    owner: PopulatedDoc<Document>,
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

const Swing = mongoose.model<ISwing>('Swing', swingSchema);

export default Swing;