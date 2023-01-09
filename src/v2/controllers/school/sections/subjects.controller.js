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

    // Asking service to create a new subject
    const subject = await subjectsService.createSubject(
      user,
      seasonId,
      title,
      videoType,
      video,
      videoURL,
      photo
    );

    // Genereate the response object
    const response = _.pick(subject, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getSeasonSubjects = async (req, res, next) => {
  try {
    const user = req.user;
    const { schoolId, seasonId } = req.query;

    // Asking service to find subject
    const subjects = await subjectsService.getSeasonSubjects(
      user,
      schoolId,
      seasonId
    );

    // Genereate the response object
    const response = {
      subjects: subjects.map((subject) => _.pick(subject, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.toggleIsSubjectFree = async (req, res, next) => {
  try {
    const user = req.user;
    const { subjectId } = req.body;

    // Asking service to toggle subject free
    const subject = await subjectsService.toggleIsSubjectFree(user, subjectId);

    // Genereate the response object
    const response = _.pick(subject, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
