const {
  Video,
} = require("../../../models/tutorial/lesson-content/video.model");
const lessonsService = require("./lessons.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const httpStatus = require("http-status");
const { ApiError } = require("../../../middleware/apiError");
const errors = require("../../../config/errors");

module.exports.findVideoById = async (videoId) => {
  try {
    return await Video.findById(videoId);
  } catch (err) {
    throw err;
  }
};

module.exports.createVideo = async (
  user,
  lessonId,
  title,
  type,
  video,
  url,
  description
) => {
  try {
    const lesson = await lessonsService.getLessonById(null, lessonId, false);

    if (!lesson) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.notFound;
      throw new ApiError(statusCode, message);
    }

    if (lesson.videoId) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.lesson.videoAdded;
      throw new ApiError(statusCode, message);
    }

    let videoURL = url;
    if (type === "video") {
      const localFile = await localStorage.storeFile(video);
      videoURL = await cloudStorage.uploadFile(localFile);
      await localStorage.deleteFile(localFile);
    }

    const _video = new Video({
      author: user._id,
      title,
      url: videoURL,
      description,
      levelId: lesson.levelId,
      gradeId: lesson.gradeId,
      seasonId: lesson.seasonId,
      subjectId: lesson.subjectId,
      unitId: lesson.unitId,
      lessonId: lesson._id,
    });

    await _video.save();

    lesson.videoId = _video._id;
    await lesson.save();

    return _video;
  } catch (err) {
    throw err;
  }
};
