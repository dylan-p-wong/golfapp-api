import Analysis from "../../../models/analysis";
import { uploadVideo } from "../../../utils/videoUpload";

const addAnalysisResolve = async (obj, { date, title, note, playerId, video, direction }, context) => {
    
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
    }


    const { filename, mimetype, encoding, createReadStream } = await video;

    const videoURL = await uploadVideo(createReadStream());

    const analysis = new Analysis({ date, title, note, player: playerId, owner: ownerId, frontVideo: videoURL, direction});

    try {
        await analysis.save();
        return analysis;
    } catch (e) {
        console.log(e);
    }
}

export { addAnalysisResolve };