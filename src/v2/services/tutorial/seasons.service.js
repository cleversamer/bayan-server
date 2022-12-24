const { Season } = require("../../models/tutorial/season.model");
const gradesService = require("./grades.service");
const localStorage = require("../storage/localStorage.service");
const cloudStorage = require("../storage/cloudStorage.service");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");

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
    const grade = await gradesService.findGradeById(gradeId);

    if (!grade) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.grade.notFound;
      throw new ApiError(statusCode, message);
    }

    const gradeSeasons = await Season.find({ gradeId: grade._id });
    const seasonAdded = gradeSeasons.find((season) => season.number === number);
    if (seasonAdded) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.season.seasonExist;
      throw new ApiError(statusCode, message);
    }

    const localFile = await localStorage.storeFile(photo);
    const cloudFile = await cloudStorage.uploadFile(localFile);
    // await localStorage.deleteFile(localFile);

    const season = new Season({
      author: user._id,
      number,
      levelId: grade.levelId,
      gradeId: grade._id,
      photoURL: cloudFile,
    });

    return await season.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getGradeSeasons = async (gradeId) => {
  try {
    const seasons = await Season.find({ gradeId });

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
