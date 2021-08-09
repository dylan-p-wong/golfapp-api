import Lesson from "../../../models/lesson";
import User from "../../../models/user";

const getLessonResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    
    if (context.userId === lesson.coach.toString() || context.userId === lesson.player.toString()) {
        if (!lesson.isCompleted && context.userId !== lesson.coach.toString()) {
            throw new Error("This lesson is not completed yet! Check back soon or contact your coach.")
        }
    } else {
        throw new Error("Unauthorized");
    }

    await lesson.populate([{path:'swings'}, {path:'analyses'}, {path:'drills'}, {path:'player'}, {path: 'coach'}]).execPopulate();
    return lesson;
}

const getUserPlayerLessonsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lessons_player', populate: [ {path: 'player'}, {path: 'coach'}]}).execPopulate();
    return user.lessons_player.filter(lesson => lesson.isCompleted);
}

const getUserCoachLessonsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lessons_coach', populate: [ {path: 'player'}, {path: 'coach'}]}).execPopulate();
    return user.lessons_coach;
}

const getLessonSwingsResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    
    if (context.userId === lesson.coach.toString() || context.userId === lesson.player.toString()) {
        if (!lesson.isCompleted && context.userId !== lesson.coach.toString()) {
            throw new Error("This lesson is not completed yet! Check back soon or contact your coach.")
        }
    } else {
        throw new Error("Unauthorized");
    }

    await lesson.populate([{path: 'swings'}]).execPopulate();

    return lesson.swings;
}

const getLessonAnalysesResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);

    if (context.userId === lesson.coach.toString()|| context.userId === lesson.player.toString()) {
        if (!lesson.isCompleted && context.userId !== lesson.coach.toString()) {
            throw new Error("This lesson is not completed yet! Check back soon or contact your coach.")
        }
    } else {
        throw new Error("Unauthorized");
    }

    await lesson.populate([{path: 'analyses'}]).execPopulate();

    return lesson.analyses;
}

const getLessonNotesResolve = async (obj, { lessonId }, context) => {   
    const lesson = await Lesson.findById(lessonId);

    if (context.userId === lesson.coach.toString() || context.userId === lesson.player.toString()) {
        if (!lesson.isCompleted && context.userId !== lesson.coach.toString()) {
            throw new Error("This lesson is not completed yet! Check back soon or contact your coach.")
        }
    } else {
        throw new Error("Unauthorized");
    }

    await lesson.populate([{path: 'notes', populate: [ {path: 'user'} ]}]).execPopulate();
    return lesson.notes;
}

const getUserPlayerLessonRequestsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lesson_requests_player', populate: [ {path: 'player'}, {path: 'coach'}, {path:'lesson'}]}).execPopulate();
    return user.lesson_requests_player;
}

const getUserCoachLessonRequestsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lesson_requests_coach', populate: [ {path: 'player'}, {path: 'coach'}, {path:'lesson'}]}).execPopulate();
    return user.lesson_requests_coach;
}

export { getLessonResolve, getUserPlayerLessonsResolve, getUserCoachLessonsResolve, getLessonSwingsResolve, getLessonAnalysesResolve, getLessonNotesResolve, getUserPlayerLessonRequestsResolve, getUserCoachLessonRequestsResolve };