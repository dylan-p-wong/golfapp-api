import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;