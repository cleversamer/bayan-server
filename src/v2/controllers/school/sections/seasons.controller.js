const {
  clientSchema,
} = require("../../../models/school/sections/season.model");
const { seasonsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createSeason = async (req, res, next) => {
  try {
    const user = req.user;
    const { gradeId, number } = req.body;
    const { photo } = req.files;

    // Asking service to create a new season
    const season = await seasonsService.createSeason(
      user,
      gradeId,
      number,
      photo
    );

    // Genereate the response object
    const response = _.pick(season, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getGradeSeasons = async (req, res, next) => {
  try {
    const user = req.user;
    const { schoolId, gradeId } = req.query;

    // Asking service to find school seasons for this grade
    const seasons = await seasonsService.getGradeSeasons(
      user,
      schoolId,
      gradeId
    );

    // Genereate the response object
    const response = {
      seasons: seasons.map((season) => _.pick(season, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
