import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export default Note;