const { Season } = require("../../../models/school/sections/season.model");
const gradesService = require("./grades.service");
const localStorage = require("../../storage/localStorage.service");
const cloudStorage = require("../../storage/cloudStorage.service");
const { ApiError } = require("../../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../../config/errors");

module.exports.findSeasonsByIds = async (seasons = []) => {
  try {
    return await Season.find({ _id: { $in: seasons } }).sort({ number: 1 });
  } catch (err) {
    throw err;
  }
};

module.exports.findSeasonById = async (seasonId) => {
  try {
    return await Season.findById(seasonId);
  } catch (err) {
    throw err;
  }
};

module.exports.createSeason = async (user, gradeId, number, photo) => {
  try {
    // Find grade
    const grade = await gradesService.findGradeById(gradeId);

    // Check if grade belongs to user's school
    if (!user.isBelongToSchool(grade.schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.grade.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Check if grade exists
    if (!grade) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.grade.notFound;
      throw new ApiError(statusCode, message);
    }

    // Find school seasons for this grade
    const gradeSeasons = await Season.find({
      schoolId: user.schoolId,
      gradeId: grade._id,
    });

    // Check if season is already added to this grade
    const seasonAdded = gradeSeasons.find((season) => season.number === number);
    if (seasonAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.season.seasonExist;
      throw new ApiError(statusCode, message);
    }

    // Store season's photo locally
    const localFile = await localStorage.storeFile(photo);

    // Store seasons's photo on the cloud
    const cloudFile = await cloudStorage.uploadFile(localFile);

    // Delete local season's photo
    await localStorage.deleteFile(localFile);

    // Create new season
    const season = new Season({
      photoURL: cloudFile,
      number,
      author: user._id,
      schoolId: user.schoolId,
      levelId: grade.levelId,
      gradeId: grade._id,
    });

    // Save season to the DB
    await season.save();

    return season;
  } catch (err) {
    throw err;
  }
};

module.exports.getGradeSeasons = async (user, schoolId, gradeId) => {
  try {
    // Check if user belongs to the school
    if (!user.isBelongToSchool(schoolId)) {
      const statusCode = httpStatus.FORBIDDEN;
      const message = errors.user.notBelongToSchool;
      throw new ApiError(statusCode, message);
    }

    // Find seasons of school
    const seasons = await Season.find({ schoolId, gradeId });

    // Check if there are no seasons
    if (!seasons || !seasons.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.season.noSeasons;
      throw new ApiError(statusCode, message);
    }

    return seasons;
  } catch (err) {
    throw err;
  }
};
