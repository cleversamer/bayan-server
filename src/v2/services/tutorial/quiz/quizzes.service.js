const mongoose = require("mongoose");
const { Quiz } = require("../../../models/tutorial/lesson-content/quiz.model");
const lessonsService = require("../lesson/lessons.service");
const questionsService = require("./questions.service");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.findQuizById = async (quizId) => {
  try {
    return await Quiz.findOne({ _id: quizId });
  } catch (err) {
    throw err;
  }
};

module.exports.getMappedWQuiz = async (quizId) => {
  try {
    const result = await Quiz.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questions",
        },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          title: 1,
          questions: {
            _id: 1,
            title: 1,
            options: 1,
            answer: 1,
            photoURL: 1,
          },
        },
      },
    ]);

    return result[0];
  } catch (err) {
    throw err;
  }
};

module.exports.createQuiz = async (user, lessonId, title) => {
  try {
    const lesson = await lessonsService.getLessonById(null, lessonId, false);

    if (!lesson) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.notFound;
      throw new ApiError(statusCode, message);
    }

    if (lesson.quizId) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.quizAdded;
      throw new ApiError(statusCode, message);
    }

    const quiz = new Quiz({
      author: user._id,
      title,
      levelId: lesson.levelId,
      gradeId: lesson.gradeId,
      seasonId: lesson.seasonId,
      subjectId: lesson.subjectId,
      unitId: lesson.unitId,
      lessonId: lesson._id,
    });

    await quiz.save();

    lesson.quizId = quiz._id;
    await lesson.save();

    return quiz;
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
    const { quiz, savedQuestion } = await questionsService.createQuestion(
      user,
      quizId,
      title,
      options,
      answer,
      photo
    );

    return quiz;
  } catch (err) {
    throw err;
  }
};
