import Swing from "../../../models/swing";

import User from '../../../models/user';

const userSwingsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate('swings').execPopulate();
    return user.swings;
}

const getSwingResolve = async (obj, args, context) => {
    const swing = await Swing.findById(args._id);
    return swing;
}

export { userSwingsResolve, getSwingResolve }