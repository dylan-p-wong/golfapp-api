import User from "../models/user";
import Notification from "../models/notification";

export const CREATED_LESSON = 'CREATED_LESSON';
export const CREATED_SWING = 'CREATED_SWING';
export const COMPLETED_LESSON = 'COMPLETED_LESSON';
export const COMPLETED_LESSON_REQUEST = 'COMPLETED_LESSON_REQUEST';

const createNotificationTitle = async (userId, type) => {
    const user = await User.findById(userId);
    
    switch (type) {
        case CREATED_LESSON:
            return `You created a lesson for ${user.firstname} ${user.lastname}`;
        case CREATED_SWING:
            return `You created a swing.`;
        case COMPLETED_LESSON:
            return `Coach ${user.firstname} ${user.lastname} updated your lesson.`;
        case COMPLETED_LESSON_REQUEST:
            return `Coach ${user.firstname} ${user.lastname} accepted your lesson request.`
        default:
            return "";
    }
}

const sendNotification = async (userId, type, actionUser = null) => {
    try {
        const title = await createNotificationTitle(actionUser, type);
        const newNotification = new Notification({ title, user: userId });
        await newNotification.save();
    } catch (e) {
        console.log(e);
    }
}

export { sendNotification };