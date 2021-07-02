import { uploadVideo } from '../../../utils/videoUpload';

const uploadVideoResolve = async (obj, { video }, context) => {
    const { filename, mimetype, encoding, createReadStream } = await video;

    const location = uploadVideo(createReadStream());

    return location;
}

export { uploadVideoResolve };