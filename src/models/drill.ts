import mongoose from 'mongoose';

const drillSchema = new mongoose.Schema({
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

const Drill = mongoose.model('Drill', drillSchema);

export default Drill;