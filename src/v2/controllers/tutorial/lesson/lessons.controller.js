const {
  clientSchema: lessonSchema,
} = require("../../../models/tutorial/lesson/lesson.model");
const {
  clientSchema: subscriptionSchema,
} = require("../../../models/subscription/subscription.model");
const {
  clientSchema: documentSchema,
} = require("../../../models/tutorial/lesson/document.model");
const {
  clientSchema: videoSchema,
} = require("../../../models/tutorial/lesson/video.model");
const {
  clientSchema: quizSchema,
} = require("../../../models/tutorial/quiz/quiz.model");
const {
  clientSchema: questionSchema,
} = require("../../../models/tutorial/quiz/question.model");
const { lessonsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.getLessonById = async (req, res, next) => {
  try {
    const user = req.user;
    const { lessonId } = req.params;

    const lesson = await lessonsService.getLessonById(user, lessonId, true);

    const response = _.pick(lesson, lessonSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.createLesson = async (req, res, next) => {
  try {
    const user = req.user;
    const { unitId, title } = req.body;

    const lesson = await lessonsService.createLesson(user, unitId, title);

    const response = _.pick(lesson, lessonSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getUnitLessons = async (req, res, next) => {
  try {
    const { unitId } = req.query;

    let units = await lessonsService.getUnitLessons(unitId);

    const response = {
      units: units.map((unit) => _.pick(unit, lessonSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addDocumnet = async (req, res, next) => {
  try {
    const user = req.user;
    const { lessonId, title } = req.body;
    const { file } = req.files;

    const document = await lessonsService.addDocument(
      user,
      lessonId,
      title,
      file
    );

    const response = _.pick(document, documentSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addVideo = async (req, res, next) => {
  try {
    const user = req.user;
    const { lessonId, title, description, type, url } = req.body;
    const video = req?.files?.video || null;

    const _video = await lessonsService.addVideo(
      user,
      lessonId,
      title,
      type,
      video,
      url,
      description
    );

    const response = _.pick(_video, videoSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const { lessonId, title } = req.body;

    const quiz = await lessonsService.addQuiz(user, lessonId, title);

    const response = _.pick(quiz, quizSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.addQuestionToQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const { quizId, title, options, answer } = req.body;
    const photo = req?.files?.photo;

    const question = await lessonsService.addQuestion(
      user,
      quizId,
      title,
      options,
      answer,
      photo
    );

    const response = _.pick(question, questionSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.submitQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const { quizId, answers } = req.body;

    const submission = await lessonsService.submitQuiz(user, quizId, answers);

    const response = _.pick(submission, subscriptionSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getDocumnent = async (req, res, next) => {
  try {
    const { documentId } = req.params;

    const document = await lessonsService.getDocument(documentId);

    const response = _.pick(document, documentSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    const video = await lessonsService.getVideo(videoId);

    const response = _.pick(video, videoSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getQuiz = async (req, res, next) => {
  try {
    const { quizId } = req.params;

    const quiz = await lessonsService.getQuiz(quizId);

    const response = _.pick(quiz, quizSchema);

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
