import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Video = mongoose.model('Video', videoSchema);

export default Video;