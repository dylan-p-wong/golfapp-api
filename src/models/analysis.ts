import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    frontVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    sideVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;