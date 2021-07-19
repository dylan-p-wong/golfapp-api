import Analysis from "../../../models/analysis";
import Drill from "../../../models/drill";
import Lesson from "../../../models/lesson";
import LessonRequest from "../../../models/lesson-request";
import Note from "../../../models/note";
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
    
    return swing;
}

const addAnalysisToLessonResolve = async (obj, { analysisId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const analysis = await Analysis.findById(analysisId);

    const analyses = lesson.analyses;
    analyses.push(analysis._id);
    lesson.analyses = analyses;
    
    await lesson.save();
    
    return analysis;
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

const addNoteToLessonResolve= async (obj, { lessonId, title, description }, context) => {
    const lesson = await Lesson.findById(lessonId);
    
    const newNote = new Note({ title, description });
    await newNote.save();

    const notes = lesson.notes;
    notes.push(newNote._id);
    lesson.notes = notes;

    await lesson.save();
    await lesson.populate('notes').execPopulate();

    return newNote;
}

const createLessonRequestResolve = async (obj, { note, coachId }, context) => {
    const newLessonRequest = new LessonRequest({ note, player: context.userId, coach: coachId });
    await newLessonRequest.save();
    await newLessonRequest.populate([{ path: 'player'}, { path: 'coach' }]).execPopulate();

    return newLessonRequest;
}

const addLessonToLessonRequest = async (obj, { lessonId, lessonRequestId }, context) => {
    const lessonRequest = await LessonRequest.findById(lessonRequestId);

    if (context.userId !== lessonRequest.coach) return;

    const lesson = await Lesson.findById(lessonId);
    lessonRequest.lesson = lesson._id;

    await lesson.save();

    return lessonRequest;
}

export { createLessonResolve, addSwingToLessonResolve, addAnalysisToLessonResolve, addDrillToLessonResolve, addNoteToLessonResolve, addLessonToLessonRequest, createLessonRequestResolve };