import Lesson from "../../../models/lesson";
import User from "../../../models/user";

const getLessonResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    await lesson.populate([{path:'swings'}, {path:'analyses'}, {path:'drills'}]).execPopulate();
    return lesson;
}

const getUserPlayerLessonsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lessons_player', populate: [ {path: 'player'}, {path: 'coach'}]}).execPopulate();
    return user.lessons_player;
}

const getUserCoachLessonsResolve = async (obj, args, context) => {
    const user = await User.findById(context.userId);
    await user.populate({path: 'lessons_coach', populate: [ {path: 'player'}, {path: 'coach'}]}).execPopulate();
    return user.lessons_coach;
}

const getLessonSwingsResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);

    await lesson.populate([{path: 'swings'}]).execPopulate();

    return lesson.swings;
}

const getLessonAnalysesResolve = async (obj, { lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);

    await lesson.populate([{path: 'analyses'}]).execPopulate();

    return lesson.analyses;
}

export { getLessonResolve, getUserPlayerLessonsResolve, getUserCoachLessonsResolve, getLessonSwingsResolve, getLessonAnalysesResolve };