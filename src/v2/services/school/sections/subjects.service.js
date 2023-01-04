const { Subject } = require("../../../models/school/sections/subject.model");
const seasonsService = require("./seasons.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findSubjectsByIds = async (subjects) => {
  try {
    return await Subject.find({ _id: { $in: subjects } });
  } catch (err) {
    throw err;
  }
};

module.exports.findSubjectById = async (subjectId) => {
  try {
    return await Subject.findById(subjectId);
  } catch (err) {
    throw err;
  }
};

module.exports.createSubject = async (
  user,
  seasonId,
  title,
  videoType,
  video,
  videoURL,
  photo
) => {
  try {
    const season = await seasonsService.findSeasonById(seasonId);

    if (!season) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.season.notFound;
      throw new ApiError(statusCode, message);
    }

    const seasonSubjects = await Subject.find({ seasonId: season._id });
    const subjectAdded = seasonSubjects.find(
      (subject) => subject.title === title
    );
    if (subjectAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subject.subjectExist;
      throw new ApiError(statusCode, message);
    }

    const subject = new Subject({
      author: user._id,
      title,
      levelId: season.levelId,
      gradeId: season.gradeId,
      seasonId: season._id,
    });

    if (videoType === "url") {
      subject.videoURL = videoURL;
    }

    // Add photo
    let localFile = await localStorage.storeFile(photo);
    let cloudFile = await cloudStorage.uploadFile(localFile);
    await localStorage.deleteFile(localFile);
    subject.photoURL = cloudFile;

    if (videoType === "video") {
      // Add video
      localFile = await localStorage.storeFile(video);
      cloudFile = await cloudStorage.uploadFile(localFile);
      await localStorage.deleteFile(localFile);
      subject.videoURL = cloudFile;
    }

    return await subject.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getSeasonSubjects = async (seasonId) => {
  try {
    const subjects = await Subject.find({ seasonId });

    if (!subjects || !subjects.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.noSubjects;
      throw new ApiError(statusCode, message);
    }

    return subjects;
  } catch (err) {
    throw err;
  }
};

module.exports.toggleIsSubjectFree = async (subjectId) => {
  try {
    const subject = await this.findSubjectById(subjectId);
    if (!subject) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.notFound;
      throw new ApiError(statusCode, message);
    }

    subject.isFree = !subject.isFree;
    return await subject.save();
  } catch (err) {
    throw err;
  }
};
