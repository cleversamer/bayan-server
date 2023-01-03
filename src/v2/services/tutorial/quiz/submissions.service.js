const quizzesService = require("../../tutorial/quiz/quizzes.service");
const lessonsService = require("../../tutorial/lesson/lessons.service");
const errors = require("../../../config/errors");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");

module.exports.createSubmission = async (user, quizId, answers) => {
  try {
    const forbiddenUserRoles = ["admin", "teacher"];

    if (forbiddenUserRoles.includes(user.role)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.quiz.notFound;
      throw new ApiError(statusCode, message);
    }

    const quiz = await quizzesService.getMappedWQuiz(quizId);

    if (!quiz) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.quiz.notFound;
      throw new ApiError(statusCode, message);
    }

    const userLessons = lessonsService.getUserUnitLessons(user, quiz.unitId);

    // TODO:

    return true;
  } catch (err) {
    throw err;
  }
};
