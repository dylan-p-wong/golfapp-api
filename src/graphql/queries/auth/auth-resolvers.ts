import User from '../../../models/user';

const userInfoResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    return user;
}

export { userInfoResolve }; 