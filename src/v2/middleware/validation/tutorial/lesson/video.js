const commonMiddleware = require("../../common");

const validateAddVideo = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkVideoTitle,
  commonMiddleware.checkVideoDescription,
  commonMiddleware.checkVideoType,
  commonMiddleware.next,
];

const validateGetVideo = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkVideoId,
  commonMiddleware.next,
];

module.exports = {
  validateAddVideo,
  validateGetVideo,
};
