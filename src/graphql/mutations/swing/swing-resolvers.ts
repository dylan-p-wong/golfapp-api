import Swing from "../../../models/swing";
import { uploadVideo } from "../../../utils/videoUpload"

export const addSwingResolve = async (obj, { date, title, note, playerId, frontVideo, sideVideo}, context) => {
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
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

    const swing = new Swing({ date, title, note, player: playerId, owner: ownerId, frontVideo: frontVideoURL, sideVideo: sideVideoURL});
    
    try {
        await swing.save();
        return swing;
    } catch (e) {
        console.log(e);
    }
}