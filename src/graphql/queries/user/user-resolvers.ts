import User from "../../../models/user";
import { getCoachTierInfo, getPlayerTierInfo } from "../../../utils/consts/tiers";
import { numberInLastMonth } from "../../../utils/dates";

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

export { userTierResolve };