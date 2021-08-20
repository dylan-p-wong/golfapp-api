import PlayerCoachConnection from "../../../models/playerCoachConnection";
import User from "../../../models/user";

const updateUserResolve = async (obj, args, context) => {
    const { info } = args;
    const user = await User.findByIdAndUpdate(context.userId, { ...info }, { new: true, runValidators: true });
    return user;
}

const addPlayerCoachConnectionResolve = async (obj, { playerId, coachId }, context) => {
    
    if (!playerId && !coachId) {
        throw new Error("Provide a coachId or playerId");
    }

    if (playerId) {
        const found = await PlayerCoachConnection.findOne({ player: playerId, coach: context.userId });

        if (found) {
            throw new Error("This is already one of your students");
        }

        const doc = new PlayerCoachConnection({ player: playerId, coach: context.userId });
        await doc.save();
        return true;
    }

    if (coachId) {
        const found = await PlayerCoachConnection.findOne({ coach: coachId, player: context.userId });

        if (found) {
            throw new Error("This is already your coach");
        }

        const doc = new PlayerCoachConnection({ coach: coachId, player: context.userId });
        await doc.save();
        return true;
    }
}

export { updateUserResolve, addPlayerCoachConnectionResolve };