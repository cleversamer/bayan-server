const { Question } = require("../../../models/tutorial/quiz/question.model");
const quizzesService = require("./quizzes.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.findQuestionById = async (questionId) => {
  try {
    return await Question.findById(questionId);
  } catch (err) {
    throw err;
  }
};

module.exports.createQuestion = async (
  user,
  quizId,
  title,
  options,
  answer,
  photo
) => {
  try {
    const quiz = await quizzesService.findQuizById(quizId);

    if (!quiz) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.quiz.notFound;
      throw new ApiError(statusCode, message);
    }

    let photoURL = "";
    if (photo) {
      const localFile = await localStorage.storeFile(photo);
      const cloudFile = await cloudStorage.uploadFile(localFile);
      await localStorage.deleteFile(localFile);
      photoURL = cloudFile;
    }

    const question = new Question({
      author: user._id,
      levelId: quiz.levelId,
      gradeId: quiz.gradeId,
      seasonId: quiz.seasonId,
      subjectId: quiz.subjectId,
      unitId: quiz.unitId,
      lessonId: quiz.lessonId,
      quizId,
      title,
      options,
      answer,
      photoURL,
    });

    await question.save();

    quiz.questions.push(question._id);
    await quiz.save();

    return { quiz, question };
  } catch (err) {
    throw err;
  }
};
