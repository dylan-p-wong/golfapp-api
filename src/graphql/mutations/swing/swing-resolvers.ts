import Swing from "../../../models/swing";
import { uploadVideo } from "../../../utils/videoUpload"

export const addSwingResolve = async (obj, { date, title, note, playerId, video, direction }, context) => {
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
    }

    const { filename, mimetype, encoding, createReadStream } = await video;

    const videoURL = await uploadVideo(createReadStream());

    const swing = new Swing({ date, title, note, player: playerId, owner: ownerId, frontVideo: videoURL, direction});

    try {
        await swing.save();
        return swing;
    } catch (e) {
        console.log(e);
    }
}