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
    // Find season
    const season = await seasonsService.findSeasonById(seasonId);

    // Check if season belongs to user's school
    if (!user.isBelongToSchool(season.schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.season.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Check if season exists
    if (!season) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.season.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if subject is already added
    const seasonSubjects = await Subject.find({
      schoolId: user.schoolId,
      seasonId: season._id,
    });
    const subjectAdded = seasonSubjects.find(
      (subject) => subject.title === title
    );
    if (subjectAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subject.subjectExist;
      throw new ApiError(statusCode, message);
    }

    // Create a new subject
    const subject = new Subject({
      title,
      author: user._id,
      schoolId: user.schoolId,
      levelId: season.levelId,
      gradeId: season.gradeId,
      seasonId: season._id,
    });

    // Check if video type is URL
    // If true, then store the URL
    if (videoType === "url") {
      subject.videoURL = videoURL;
    }

    // Store subject's photo locally
    let localFile = await localStorage.storeFile(photo);

    // Store subject's photo on the cloud
    let cloudFile = await cloudStorage.uploadFile(localFile);

    // Delete local subject's photo
    await localStorage.deleteFile(localFile);

    // Update subject's photo URL
    subject.photoURL = cloudFile;

    // Check if video type is video
    // If true, then store the video on the cloud
    // and store video's URL in the subject object
    if (videoType === "video") {
      // Store subject's video locally
      localFile = await localStorage.storeFile(video);

      // Store subject's video on the cloud
      cloudFile = await cloudStorage.uploadFile(localFile);

      // Delete local subject's video
      await localStorage.deleteFile(localFile);

      // Update subject's video URL
      subject.videoURL = cloudFile;
    }

    // Save subject to the DB
    await subject.save();

    return subject;
  } catch (err) {
    throw err;
  }
};

module.exports.getSeasonSubjects = async (user, schoolId, seasonId) => {
  try {
    // Check if user belongs to the school
    if (!user.isBelongToSchool(schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Find school subjects for this school
    const subjects = await Subject.find({ schoolId, seasonId });

    // Check if there are no subjects
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

module.exports.toggleIsSubjectFree = async (user, subjectId) => {
  try {
    // Find subject
    const subject = await this.findSubjectById(subjectId);

    // Check if subject belongs to user's school
    if (!user.isBelongToSchool(subject.schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Check if subject exists
    if (!subject) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.notFound;
      throw new ApiError(statusCode, message);
    }

    // Update is subject free
    subject.isFree = !subject.isFree;

    // Save subject to the DB
    await subject.save();

    return subject;
  } catch (err) {
    throw err;
  }
};
