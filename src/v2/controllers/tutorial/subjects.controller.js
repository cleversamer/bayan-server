const { clientSchema } = require("../../models/tutorial/subject.model");
const { subjectsService } = require("../../services");
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

    res.status(httpStatus.CREATED).json(_.pick(subject, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.getSeasonSubjects = async (req, res, next) => {
  try {
    const { seasonId } = req.query;

    let subjects = await subjectsService.getSeasonSubjects(seasonId);
    subjects = subjects.map((subject) => _.pick(subject, clientSchema));

    res.status(httpStatus.OK).json(subjects);
  } catch (err) {
    next(err);
  }
};

module.exports.toggleIsSubjectFree = async (req, res, next) => {
  try {
    const { subjectId } = req.body;
    const subject = await subjectsService.toggleIsSubjectFree(subjectId);
    res.status(httpStatus.CREATED).json(subject);
  } catch (err) {
    next(err);
  }
};
