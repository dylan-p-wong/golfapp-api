import User from "../../../models/user";

const updateUserResolve = async (obj, args, context) => {
    const { info } = args;
    const user = await User.findByIdAndUpdate(context.userId, { ...info }, { new: true });
    return user;
}

export { updateUserResolve };