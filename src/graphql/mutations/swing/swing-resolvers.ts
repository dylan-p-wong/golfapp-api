import Swing from "../../../models/swing";
import User from "../../../models/user";
import { getPlayerTierInfo } from "../../../utils/consts/tiers";
import { numberInLastMonth } from "../../../utils/dates";
import { uploadVideo } from "../../../utils/video";

export const addSwingResolve = async (obj, { title, note, playerId, frontVideo, sideVideo}, context) => {
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
    }

    const ownerUser = await User.findById(ownerId);
    await ownerUser.populate('swings').execPopulate();

    const tier = getPlayerTierInfo(ownerUser.playerTier);

    const numberOfSwingsLastMonth = numberInLastMonth(ownerUser.swings);

    if (numberOfSwingsLastMonth >= tier.swingUploadsPerMonth) {
        throw new Error("You cannot upload more swings this month.");
    }

    let frontVideoURL;
    let sideVideoURL;

    if (frontVideo) {
        const { filename, mimetype, encoding, createReadStream } = await frontVideo;
        frontVideoURL = await uploadVideo(createReadStream());
    }
    
    if (sideVideo) {
        const { filename, mimetype, encoding, createReadStream } = await sideVideo;
        sideVideoURL = await uploadVideo(createReadStream());
    }

    const swing = new Swing({ title, note, player: playerId, owner: ownerId, frontVideo: frontVideoURL, sideVideo: sideVideoURL});
    
    try {
        await swing.save();
        return swing;
    } catch (e) {
        console.log(e);
    }
}