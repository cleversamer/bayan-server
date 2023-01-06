const { check } = require("express-validator");
const errors = require("../../../../config/errors");
const commonCheckers = require("../../common");
const httpStatus = require("http-status");
const { ApiError } = require("../../../apiError");

const validateCreateSubject = [
  check("seasonId").isMongoId().withMessage(errors.season.invalidId),

  check("title")
    .isLength({ min: 1, max: 64 })
    .withMessage(errors.subject.invalidTitle),

  (req, res, next) => {
    const { videoType } = req.body;

    if (!videoType) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.video.noVideo;
      const err = new ApiError(statusCode, message);
      return next(err);
    }

    switch (videoType) {
      case "url":
        return check("videoURL").isURL().withMessage(errors.video.invalidURL)(
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

  commonCheckers.checkFile("photo", ["png", "jpg", "jpeg"]),

  commonCheckers.next,
];

const validateGetSeasonSubjects = [commonCheckers.checkMongoIdQueryParam];

const validateToggleIsSubjectFree = [
  check("subjectId").isMongoId().withMessage(errors.subject.invalidId),

  commonCheckers.next,
];

module.exports = {
  validateCreateSubject,
  validateGetSeasonSubjects,
  validateToggleIsSubjectFree,
};
