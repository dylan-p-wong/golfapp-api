import Analysis from "../../../models/analysis";
import Drill from "../../../models/drill";
import Lesson from "../../../models/lesson";
import LessonRequest from "../../../models/lesson-request";
import Note from "../../../models/note";
import Swing from "../../../models/swing";
import User from "../../../models/user";
import { lessonAuthorization, swingAuthorization } from "../../../utils/authorization";
import { getCoachTierInfo } from "../../../utils/consts/tiers";
import { numberInLastMonth } from "../../../utils/dates";

const createLessonResolve = async (obj, { playerId, title }, context) => {
    const player = await User.findById(playerId);

    if (!player) {
        throw new Error("Player does not exist.");
    }

    const coach = await User.findById(context.userId);

    if (!coach) {
        throw new Error("Coach does not exist.");
    }

    await coach.populate('lessons_coach').execPopulate();

    const tier = getCoachTierInfo(coach.coachTier);
    const numberOfLessonsLastMonth = numberInLastMonth(coach.lessons_coach);

    if (numberOfLessonsLastMonth >= tier.lessonsPerMonth) {
        throw new Error("You cannot create more lessons this month.");
    }

    const lesson = new Lesson({player: playerId, coach: coach._id, title});
    lesson.save();
    return lesson;
}

const addSwingToLessonResolve = async (obj, { swingId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const swing = await Swing.findById(swingId);
    
    lessonAuthorization(lesson, context.userId, { edit: true });
    swingAuthorization(swing, context.userId, { view: true });
    
    if (lesson.swings.length >= 3) {
        throw new Error("You can only add 3 swings to a lesson.");
    }

    lesson.swings.push(swing._id);

    await lesson.save();
    
    return swing;
}

const addAnalysisToLessonResolve = async (obj, { analysisId, lessonId }, context) => {
    const lesson = await Lesson.findById(lessonId);
    const analysis = await Analysis.findById(analysisId);

    lessonAuthorization(lesson, context.userId, { edit: true });

    if (lesson.analyses.length >= 3) {
        throw new Error("You can only add 3 analyses to a lesson.");
    }

    lesson.analyses.push(analysis._id);
    
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
    lessonAuthorization(lesson, context.userId, { edit: true });
    
    const newNote = new Note({ title, description, user: context.userId });
    await newNote.save();

    lesson.notes.push(newNote._id);

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

const addLessonToLessonRequestResolve = async (obj, { lessonId, lessonRequestId }, context) => {
    const lessonRequest = await LessonRequest.findById(lessonRequestId);

    if (context.userId !== lessonRequest.coach.toString()) {
        throw new Error("Unauthorized");
    }

    const lesson = await Lesson.findById(lessonId);

    lessonRequest.lesson = lesson._id;
    
    await lessonRequest.save();
    await lessonRequest.populate([{ path: 'player'}, { path: 'coach' }]).execPopulate();

    return lessonRequest;
}

const cancelLessonRequestResolve = async (obj, { lessonRequestId }, context) => {
    const lessonRequest = await LessonRequest.findById(lessonRequestId);

    if (context.userId !== lessonRequest.player.toString() && context.userId !== lessonRequest.coach.toString()) {
        throw new Error("Not your lesson");
    }

    lessonRequest.isCancelled = true;
    await lessonRequest.save();
    await lessonRequest.populate([{ path: 'player'}, { path: 'coach' }]).execPopulate();

    return lessonRequest;
}

const updateLessonResolve = async (obj, { lessonId, info }, context) => {
    const lesson = await Lesson.findById(lessonId);

    lessonAuthorization(lesson, context.userId, { edit: true });

    if (!lesson) {
        throw new Error("No lesson with this id exists.");
    }

    if (context.userId !== lesson.coach.toString()) {
        throw new Error("Unauthorized");
    }

    return await Lesson.findByIdAndUpdate(lessonId, { ...info }, { new: true });
}

export { updateLessonResolve, createLessonResolve, addSwingToLessonResolve, addDrillToLessonResolve, addAnalysisToLessonResolve, addNoteToLessonResolve, addLessonToLessonRequestResolve, createLessonRequestResolve, cancelLessonRequestResolve };