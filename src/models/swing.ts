import mongoose from 'mongoose';

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
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Swing = mongoose.model('Swing', swingSchema);

export default Swing;