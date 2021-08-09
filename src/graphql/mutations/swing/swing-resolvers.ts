import Swing from "../../../models/swing";
import User from "../../../models/user";
import { getPlayerTierInfo } from "../../../utils/consts/tiers";
import { numberInLastMonth } from "../../../utils/dates";
import { uploadVideo } from "../../../utils/video";

const addSwingResolve = async (obj, { title, note, playerId, frontVideo, sideVideo}, context) => {
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

const addViewerToSwingResolve = async (obj, { swingId, userId }, context) => {
    const swing = await Swing.findById(swingId);

    if (swing.viewers.indexOf(userId) < 0) {
        swing.viewers.push(userId);

        await swing.save();
    }

    return swing;
}

const updateSwingResolve = async (obj, { swingId, info }, context) => {
    const swing = await Swing.findById(swingId);

    if (!swing) {
        throw new Error("No lesson with this id exists.");
    }

    if (context.userId !== swing.owner.toString()) {
        throw new Error("Unauthorized");
    }

    return await Swing.findByIdAndUpdate(swingId, {...info}, { new: true });
}

export { updateSwingResolve, addSwingResolve, addViewerToSwingResolve };