import Swing from "../../../models/swing";
import User from '../../../models/user';

const userSwingsResolve = async (obj, { playerId }, context) => {
    let _id = context.userId;
    if (playerId) {
        _id = playerId;
    }

    const user = await User.findById(_id);

    await user.populate('swings').execPopulate();
    return playerId ? user.swings.filter(swing => swing.isPublic || swing.viewers.indexOf(context.userId) >= 0) : user.swings;
}

const getSwingResolve = async (obj, { _id }, context) => {
    const swing = await Swing.findById(_id);
    
    if (swing.owner.toString() !== context.userId && swing.viewers.indexOf(context.userId) <= 0 && !swing.isPublic) {
        throw new Error("Unauthorized!");
    }

    await swing.populate([{path:'player'}, {path:'owner'}]).execPopulate();

    return swing;
}

export { userSwingsResolve, getSwingResolve }