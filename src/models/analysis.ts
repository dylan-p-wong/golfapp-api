import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
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
        type: String
    },
    sideVideo: {
        type: String
    },
    voice: {
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;