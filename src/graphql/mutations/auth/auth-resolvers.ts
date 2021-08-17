import User from '../../../models/user';
import cookieSettings from '../../../utils/consts/cookie-settings';

const loginResolve = async (obj, { email, password }, context) => {
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        context.res.cookie('client-token', token, cookieSettings);
        return true;
    } catch (e) {
        throw new Error(e);
    }
}

const signupResolve = async (obj, { email, password, firstname, lastname, playerAccount, coachAccount }, context) => {
    try {
        const newUser = new User({ email, password, firstname, lastname, playerAccount, coachAccount });
        await newUser.save();
        const token = await newUser.generateAuthToken();
        context.res.cookie('client-token', token, cookieSettings);
        return true;
    } catch (e) {
        throw new Error(e);
    }
}

const logoutResolve = async (obj, args, context) => {
    try {
        const user = await User.findById(context.userId);

        user.tokens = user.tokens.filter(token => {
            return token.token !== context.req.cookies['client-token'];
        });

        await user.save();

        context.res.clearCookie('client-token');
    } catch (e) {
        throw new Error(e);
    }
}

export { loginResolve, signupResolve, logoutResolve };