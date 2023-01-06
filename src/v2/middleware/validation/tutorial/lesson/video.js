const commonMiddleware = require("../../common");

const validateAddVideo = [
  commonMiddleware.checkLessonId,
  commonMiddleware.checkVideoTitle,
  commonMiddleware.checkVideoDescription,
  commonMiddleware.checkVideoType,
  commonMiddleware.next,
];

const validateParamsId = [
  commonMiddleware.checkMongoIdParam,
  commonMiddleware.next,
];

module.exports = {
  validateAddVideo,
  validateParamsId,
};
