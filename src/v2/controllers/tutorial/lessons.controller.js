const { clientSchema } = require("../../models/tutorial/lesson.model");
const { lessonsService } = require("../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.getLessonById = async (req, res, next) => {
  try {
    const user = req.user;
    const { id: lessonId } = req.params;

    const lesson = await lessonsService.getLessonById(user, lessonId, true);

    res.status(httpStatus.OK).json(lesson);
  } catch (err) {
    next(err);
  }
};

module.exports.createLesson = async (req, res, next) => {
  try {
    const user = req.user;
    const { unitId, title } = req.body;

    const lesson = await lessonsService.createLesson(user, unitId, title);
    res.status(httpStatus.CREATED).json(_.pick(lesson, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.getUnitLessons = async (req, res, next) => {
  try {
    const { id: unitId } = req.params;

    let units = await lessonsService.getUnitLessons(unitId);

    res.status(httpStatus.OK).json(units);
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

    res.status(httpStatus.CREATED).json(document);
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

    res.status(httpStatus.CREATED).json(_video);
  } catch (err) {
    next(err);
  }
};

module.exports.addQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const { lessonId, title } = req.body;

    const quiz = await lessonsService.addQuiz(user, lessonId, title);

    res.status(httpStatus.CREATED).json(quiz);
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

    res.status(httpStatus.CREATED).json(question);
  } catch (err) {
    next(err);
  }
};

module.exports.submitQuiz = async (req, res, next) => {
  try {
    const user = req.user;
    const { quizId, answers } = req.body;

    const submission = await lessonsService.submitQuiz(user, quizId, answers);

    res.status(httpStatus.CREATED).json(submission);
  } catch (err) {
    next(err);
  }
};

module.exports.getDocumnent = async (req, res, next) => {
  try {
    const { id: documentId } = req.params;
    const quiz = await lessonsService.getDocument(documentId);
    res.status(httpStatus.OK).json(quiz);
  } catch (err) {
    next(err);
  }
};

module.exports.getVideo = async (req, res, next) => {
  try {
    const { id: videoId } = req.params;
    const quiz = await lessonsService.getVideo(videoId);
    res.status(httpStatus.OK).json(quiz);
  } catch (err) {
    next(err);
  }
};

module.exports.getQuiz = async (req, res, next) => {
  try {
    const { id: quizId } = req.params;
    const quiz = await lessonsService.getQuiz(quizId);
    res.status(httpStatus.OK).json(quiz);
  } catch (err) {
    next(err);
  }
};
