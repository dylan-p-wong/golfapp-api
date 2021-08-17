import mongoose from 'mongoose';

const playerCoachConnectionSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }
}, { timestamps: true });

const PlayerCoachConnection = mongoose.model('PlayerCoachConnection', playerCoachConnectionSchema);

export default PlayerCoachConnection;