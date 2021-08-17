import User from "../../../models/user";
import { getCoachTierInfo, getPlayerTierInfo } from "../../../utils/consts/tiers";
import { numberInLastMonth } from "../../../utils/dates";
import Notification from "../../../models/notification";

const userTierResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);

    const coachTier = getCoachTierInfo(user.coachTier);
    const playerTier = getPlayerTierInfo(user.playerTier);

    await user.populate([{path: 'lessons_coach'}, {path: 'swings'}]).execPopulate();

    const lessonsThisMonth = numberInLastMonth(user.lessons_coach);
    const swingsThisMonth = numberInLastMonth(user.swings);

    return {
        coachTier: {...coachTier, lessonsThisMonth},
        playerTier: {...playerTier, swingsThisMonth}
    }
}

const userNotificationResolve = async (obj, { count = 3 }, context) => {
    return await Notification.find({ user: context.userId }).sort({ _id: -1 }).limit(count);
}

const userTotalsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);

    await user.populate([{path: 'students'}, {path: 'lessons_coach'}, {path: 'swings'}, {path: 'lessons_player'}]).execPopulate();

    const lessonsRecievedThisMonth = numberInLastMonth(user.lessons_player);
    const lessonsThisMonth = numberInLastMonth(user.lessons_coach);
    const swingsThisMonth = numberInLastMonth(user.swings);

    return {
        lessonsRecievedThisMonth,
        lessonsThisMonth,
        swingsThisMonth,
        totalLessonsRecieved: user.lessons_player.length,
        totalLessons: user.lessons_coach.length,
        totalSwings: user.swings.length,
        totalStudents: user.students.length
    }
}

const userStudentsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);

    await user.populate([{path: 'students', populate: [{ path: 'player' }]}]).execPopulate();

    return user.students.map(connection => connection.player);
}

const userCoachesResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);

    await user.populate([{path: 'coaches', populate: [{ path: 'coach' }]}]).execPopulate();

    return user.coaches.map(connection => connection.coach);
}

export { userCoachesResolve, userTierResolve, userNotificationResolve, userTotalsResolve, userStudentsResolve };