import AWS from 'aws-sdk';

if (process.env.NODE_ENV !== 'PROD') {
    require('dotenv').config();
}

const s3 = new AWS.S3({
    apiVersion: 'latest',
    region: 'us-east-2'
});

const getVideoKey = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result + ".mp4";
}

const uploadVideo = async (createReadStream) => {
    const stored = await s3.upload({ Bucket: process.env.AWS_BUCKET, Key: getVideoKey(), Body: createReadStream}, (err, data) => {
        if (err) {
            console.error(err);
        }

        if (data) {
            return data.Location;
        }
    }).promise();

    return stored.Location;
}

const getVideoKeyFromLocation = location => {
    return location.split('/')[location.split('/').length - 1];
}

const deleteVideo = async (location) => {
    await s3.deleteObject({ Bucket: process.env.AWS_BUCKET, Key: getVideoKeyFromLocation(location) }, (err, data) => {
        if (err) {
            console.error(err);
            return false;
        }

        if (data) {
            return true;
        }
    }).promise();
}

export { uploadVideo, deleteVideo }