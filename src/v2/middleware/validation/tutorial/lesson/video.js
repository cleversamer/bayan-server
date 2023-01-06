const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");

const validateAddVideo = [
  check("lessonId").isMongoId().withMessage(errors.lesson.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.video.invalidTitle),

  check("description")
    .isLength({ min: 1, max: 1024 })
    .withMessage(errors.video.invalidDescription),

  (req, res, next) => {
    const { type } = req.body;

    if (!type) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.video.noVideo;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    switch (type) {
      case "url":
        return check("url").isURL().withMessage(errors.video.invalidURL)(
          req,
          res,
          next
        );

      case "video":
        return commonCheckers.checkFile("video", ["mp4"])(req, res, next);

      default:
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.video.invalidType;
        const err = new ApiError(statusCode, message);
        return next(err);
    }
  },

  commonCheckers.next,
];

const validateParamsId = [commonCheckers.checkMongoIdParam];

module.exports = {
  validateAddVideo,
  validateParamsId,
};
