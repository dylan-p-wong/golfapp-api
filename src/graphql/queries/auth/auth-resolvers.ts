import User from '../../../models/user';

const userInfoResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    return user;
}

const getUsersResolve = async (obj, args, context) => {
    const users = await User.find();
    return users;
}

export { getUsersResolve, userInfoResolve }; 