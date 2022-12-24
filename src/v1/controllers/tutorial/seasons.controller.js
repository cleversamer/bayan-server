const { clientSchema } = require("../../models/tutorial/season.model");
const { seasonsService } = require("../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createSeason = async (req, res, next) => {
  try {
    const user = req.user;
    const { gradeId, number } = req.body;
    const { photo } = req.files;

    const season = await seasonsService.createSeason(
      user,
      gradeId,
      number,
      photo
    );

    res.status(httpStatus.CREATED).json(_.pick(season, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.getGradeSeasons = async (req, res, next) => {
  try {
    const { gradeId } = req.query;

    let seasons = await seasonsService.getGradeSeasons(gradeId);
    seasons = seasons.map((season) => _.pick(season, clientSchema));

    res.status(httpStatus.OK).json(seasons);
  } catch (err) {
    next(err);
  }
};
