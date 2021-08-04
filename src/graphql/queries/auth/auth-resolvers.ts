import User from '../../../models/user';
import { numberInLastMonth } from '../../../utils/dates';

const userInfoResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    
    return user;
}

const getUsersResolve = async (obj, args, context) => {
    const users = await User.find({ playerAccount: true });

    users.filter(player => {
        return player.playerInfoCompleted
    });

    return users;
}

const getCoachesResolve = async (obj, args, context) => {
    const coaches = await User.find({ coachAccount: true });

    coaches.filter(coach => {
        return coach.coachInfoCompleted
    });

    return coaches;
}

export { getUsersResolve, userInfoResolve, getCoachesResolve }; 