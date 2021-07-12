import Analysis from "../../../models/analysis";
import Drill from "../../../models/drill";
import Lesson from "../../../models/lesson";
import Swing from "../../../models/swing";
import User from "../../../models/user";

const createLessonResolve = async (obj, { playerId, title }, context) => {
    const player = await User.findById(playerId);

    if (!player) {
        return null;
    }

    const coach = await User.findById(context.userId);

    if (!coach) {
        return null;
    }

    const lesson = new Lesson({player: playerId, coach: coach._id, title});
    lesson.save();
    return lesson;
}

const addSwingToLessonResolve = async (obj, { swingId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const swing = await Swing.findById(swingId);
    
    const swings = lesson.swings;
    swings.push(swing._id)
    lesson.swings = swings;

    await lesson.save();
    await lesson.populate('swings').execPopulate();
    
    return lesson.swings;
}

const addAnalysisToLessonResolve = async (obj, { analysisId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const analysis = await Analysis.findById(analysisId);

    const analyses = lesson.analyses;
    analyses.push(analysis._id);
    lesson.analyses = analyses;

    await lesson.save();
    await lesson.populate('analyses').execPopulate();
    
    return lesson.analyses;
}

const addDrillToLessonResolve = async (obj, { drillId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const drill = await Drill.findById(drillId);

    const drills = lesson.drills;
    drills.push(drill._id);

    await lesson.save();
    await lesson.populate('drills').execPopulate();

    return lesson.drills;
}

export { createLessonResolve, addSwingToLessonResolve, addAnalysisToLessonResolve, addDrillToLessonResolve };