import Analysis from "../../../models/analysis";
import { uploadVideo } from "../../../utils/videoUpload";

const addAnalysisResolve = async (obj, { date, title, note, playerId, video1, video2, direction }, context) => {
    
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
    }

    let video1URL;
    let video2URL;

    if (video1) {
        const { filename, mimetype, encoding, createReadStream } = await video1;

        video1URL = await uploadVideo(createReadStream());
    }

    if (video2) {
        const { filename, mimetype, encoding, createReadStream } = await video2;

        video2URL = await uploadVideo(createReadStream());
    }

    const analysis = new Analysis({ date, title, note, player: playerId, owner: ownerId, frontVideo: video1URL, sideVideo: video2URL, direction});

    try {
        await analysis.save();
        return analysis;
    } catch (e) {
        console.log(e);
    }
}

export { addAnalysisResolve };