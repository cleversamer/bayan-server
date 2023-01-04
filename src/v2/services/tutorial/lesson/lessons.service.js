const { Lesson } = require("../../../models/tutorial/lesson/lesson.model");
const unitsService = require("../../school/sections/units.service");
const subscriptionsService = require("../../subscription/subscriptions.service");
const videosService = require("./videos.service");
const documentsService = require("./documents.service");
const quizzesService = require("../quiz/quizzes.service");
const submissionsService = require("../quiz/submissions.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");
const mongoose = require("mongoose");

module.exports.getLessonById = async (user, lessonId, mapped = true) => {
  try {
    if (!mapped) {
      return await Lesson.findById(lessonId);
    }

    let result = await Lesson.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(lessonId) } },
      {
        $lookup: {
          from: "videos",
          localField: "videoId",
          foreignField: "_id",
          as: "video",
        },
      },
      {
        $lookup: {
          from: "documents",
          localField: "documentId",
          foreignField: "_id",
          as: "document",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subjectId",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          quizId: 1,
          subject: {
            _id: 1,
            isFree: 1,
          },
          video: {
            _id: 1,
            title: 1,
            description: 1,
            url: 1,
          },
          document: {
            _id: 1,
            title: 1,
            fileUrl: 1,
          },
        },
      },
    ]);

    // Filter the lesson
    const lesson = result[0];

    if (Array.isArray(lesson.video) && !lesson.video.length) {
      lesson.video = "";
    }

    if (Array.isArray(lesson.document) && !lesson.document.length) {
      lesson.document = "";
    }

    // Check if the lesson is free or is purchased
    const isFirstLesson =
      lesson.title.includes("الدرس الأول") ||
      lesson.title.includes("الدرس الاول");

    const authorized =
      user?.role === "admin" || lesson.subject[0].isFree || isFirstLesson;

    if (authorized) {
      delete lesson.subject;
      return lesson;
    }

    const isSubscribed = await subscriptionsService.checkIfSubjectSubscribed(
      user,
      lesson.subject[0]._id
    );

    if (isSubscribed) {
      delete lesson.subject;
      return lesson;
    }

    const statusCode = httpStatus.FORBIDDEN;
    const message = errors.lesson.notSubscribed;
    throw new ApiError(statusCode, message);
  } catch (err) {
    throw err;
  }
};

module.exports.createLesson = async (user, unitId, title) => {
  try {
    const unit = await unitsService.findUnitById(unitId);

    if (!unit) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.unit.notFound;
      throw new ApiError(statusCode, message);
    }

    const unitLessons = await Lesson.find({ unitId: unit._id });
    const unitAdded = unitLessons.find((lesson) => lesson.title === title);
    if (unitAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.lesson.lessonExist;
      throw new ApiError(statusCode, message);
    }

    const lesson = new Lesson({
      author: user._id,
      title,
      levelId: unit.levelId,
      gradeId: unit.gradeId,
      seasonId: unit.seasonId,
      subjectId: unit.subjectId,
      unitId: unit._id,
    });

    return await lesson.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getUnitLessons = async (unitId) => {
  try {
    const lessons = await Lesson.find({ unitId });

    if (!lessons || !lessons.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.noLessons;
      throw new ApiError(statusCode, message);
    }

    return lessons;
  } catch (err) {
    throw err;
  }
};

module.exports.addDocument = async (user, lessonId, title, file) => {
  try {
    return await documentsService.createDocument(user, lessonId, title, file);
  } catch (err) {
    throw err;
  }
};

module.exports.addVideo = async (
  user,
  lessonId,
  title,
  type,
  video,
  url,
  description
) => {
  try {
    return await videosService.createVideo(
      user,
      lessonId,
      title,
      type,
      video,
      url,
      description
    );
  } catch (err) {
    throw err;
  }
};

module.exports.addQuiz = async (user, lessonId, title) => {
  try {
    return await quizzesService.createQuiz(user, lessonId, title);
  } catch (err) {
    throw err;
  }
};

module.exports.addQuestion = async (
  user,
  quizId,
  title,
  options,
  answer,
  photo
) => {
  try {
    return await quizzesService.addQuestion(
      user,
      quizId,
      title,
      options,
      answer,
      photo
    );
  } catch (err) {
    throw err;
  }
};

module.exports.submitQuiz = async (user, quizId, answers) => {
  try {
    return await submissionsService.createSubmission(user, quizId, answers);
  } catch (err) {
    throw err;
  }
};

module.exports.getQuiz = async (quizId) => {
  try {
    const quiz = await quizzesService.getMappedWQuiz(quizId);

    if (!quiz) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.quiz.notFound;
      throw new ApiError(statusCode, message);
    }

    return quiz;
  } catch (err) {
    throw err;
  }
};
