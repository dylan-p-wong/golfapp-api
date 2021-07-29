import User from '../../../models/user';

const loginResolve = async (obj, { email, password }, context) => {
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        context.res.cookie('client-token', token);
        return true;
    } catch (e) {
        console.log(e);
    }
}

const signupResolve = async (obj, { email, password, firstname, lastname, playerAccount, coachAccount }, context) => {
    try {
        const newUser = new User({ email, password, firstname, lastname, playerAccount, coachAccount });
        await newUser.save();
        const token = await newUser.generateAuthToken();
        context.res.cookie('client-token', token);
        return true;
    } catch (e) {
        console.log(e);
    }
}

const logoutResolve = async (obj, args, context) => {
    try {
        context.res.clearCookie('client-token');
    } catch (e) {

    }
}

export { loginResolve, signupResolve, logoutResolve };