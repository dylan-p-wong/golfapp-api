import jwt from 'jsonwebtoken';
import User from '../models/user';

const authorization = async (resolve, params) => {
    const { obj, args, context } = params;

    const { req, res } = context;

    const token = req.cookies['client-token'];
    
    if (!token) {
        return null;
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded._id) {
        return null;
    }

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token});

    if (!user) {
        throw new Error("Unauthorized");
    }

    context.userId = decoded._id;

    return resolve(obj, args, context);
}

const lessonAuthorization = (lesson, userId, options) => {
    if (options.view) {
        if (userId !== lesson.coach.toString() && userId !== lesson.player.toString() && !lesson.isPublic) {
            throw new Error("Unauthorized");
        }
        if (userId !== lesson.coach.toString() && !lesson.isCompleted) {
            throw new Error("This lesson is not completed yet! Check back soon or contact your coach.");
        }
    }

    if (options.edit) {
        if (userId !== lesson.coach.toString()) {
            throw new Error("Unauthorized");
        }
    }

    if (options.edit_player) {
        if (userId !== lesson.coach.toString() && userId !== lesson.player.toString()) {
            throw new Error("Unauthorized");
        }
    }
}

const swingAuthorization = (swing, userId, options) => {
    if (options.view) {
        if (userId !== swing.owner.toString() && !swing.isPublic) {
            throw new Error("Unauthorized");
        }
    }

    if (options.edit) {
        if (userId !== swing.owner.toString()) {
            throw new Error("Unauthorized");
        }
    }
}

export { authorization, lessonAuthorization, swingAuthorization };