import mongoose from 'mongoose';

const swingSchema = new mongoose.Schema({
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

const Swing = mongoose.model('Swing', swingSchema);

export default Swing;