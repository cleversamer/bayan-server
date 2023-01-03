const {
  Document,
} = require("../../../models/tutorial/lesson-content/document.model");
const lessonsService = require("./lessons.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.findDocumentById = async (documentId) => {
  try {
    return await Document.findById(documentId);
  } catch (err) {
    throw err;
  }
};

module.exports.createDocument = async (user, lessonId, title, file) => {
  try {
    const lesson = await lessonsService.getLessonById(null, lessonId, false);

    if (!lesson) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.notFound;
      throw new ApiError(statusCode, message);
    }

    if (lesson.documentId) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.documentAdded;
      throw new ApiError(statusCode, message);
    }

    const localFile = await localStorage.storeFile(file);
    const cloudFile = await cloudStorage.uploadFile(localFile);
    await localStorage.deleteFile(localFile);

    const document = new Document({
      author: user._id,
      title,
      fileUrl: cloudFile,
      levelId: lesson.levelId,
      gradeId: lesson.gradeId,
      seasonId: lesson.seasonId,
      subjectId: lesson.subjectId,
      unitId: lesson.unitId,
      lessonId: lesson._id,
    });

    await document.save();

    lesson.documentId = document._id;
    await lesson.save();

    return document;
  } catch (err) {
    throw err;
  }
};
