import Swing from "../../../models/swing";
import User from '../../../models/user';

const userSwingsResolve = async (obj, { playerId }, context) => {
    let _id = context.userId;
    if (playerId) {
        _id = playerId;
    }

    const user = await User.findById(_id);
    await user.populate('swings').execPopulate();
    return user.swings;
}

const getSwingResolve = async (obj, args, context) => {
    const swing = await Swing.findById(args._id);
    return swing;
}

export { userSwingsResolve, getSwingResolve }