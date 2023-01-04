const {
  clientSchema,
} = require("../../../models/school/sections/subject.model");
const { subjectsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createSubject = async (req, res, next) => {
  try {
    const user = req.user;
    const { seasonId, title, videoType, videoURL } = req.body;
    const { video, photo } = req.files;

    const subject = await subjectsService.createSubject(
      user,
      seasonId,
      title,
      videoType,
      video,
      videoURL,
      photo
    );

    const response = _.pick(subject, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getSeasonSubjects = async (req, res, next) => {
  try {
    const { seasonId } = req.query;

    const subjects = await subjectsService.getSeasonSubjects(seasonId);

    const response = {
      subjects: subjects.map((subject) => _.pick(subject, clientSchema)),
    };

    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.toggleIsSubjectFree = async (req, res, next) => {
  try {
    const { subjectId } = req.body;

    const subject = await subjectsService.toggleIsSubjectFree(subjectId);

    const response = _.pick(subject, clientSchema);

    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
