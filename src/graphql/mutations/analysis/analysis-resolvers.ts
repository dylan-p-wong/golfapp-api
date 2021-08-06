import Analysis from "../../../models/analysis";
import { uploadAudio, uploadVideo } from "../../../utils/video";

const addAnalysisResolve = async (obj, { date, title, note, playerId, video1, video2, voice, direction }, context) => {
    const ownerId = context.userId;

    if (!playerId) {
        playerId = context.userId;
    }

    if (!video1 && !video2) {
        throw new Error("You must provide at least one file!");
    }

    let video1URL;
    let video2URL;
    let voiceURL;

    if (video1) {
        const { filename, mimetype, encoding, createReadStream } = await video1;

        video1URL = await uploadVideo(createReadStream());
    }

    if (video2) {
        const { filename, mimetype, encoding, createReadStream } = await video2;

        video2URL = await uploadVideo(createReadStream());
    }

    if (voice) {
        const { filename, mimetype, encoding, createReadStream } = await voice;

        voiceURL = await uploadAudio(createReadStream());
    }

    const analysis = new Analysis({ date, title, note, player: playerId, owner: ownerId, frontVideo: video1URL, sideVideo: video2URL, voice: voiceURL, direction});

    try {
        await analysis.save();
        return analysis;
    } catch (e) {
        console.log(e);
    }
}

export { addAnalysisResolve };