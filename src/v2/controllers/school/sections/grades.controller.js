const { clientSchema } = require("../../../models/school/sections/grade.model");
const { gradesService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.createGrade = async (req, res, next) => {
  try {
    const user = req.user;
    const { schoolId } = req.params;
    const { levelId, number } = req.body;
    const { photo } = req.files;

    // Asking service to create a new grade
    const grade = await gradesService.createGrade(user, levelId, number, photo);

    // Genereate the response object
    const response = _.pick(grade, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getLevelGrades = async (req, res, next) => {
  try {
    const user = req.user;
    const { schoolId } = req.params;
    const { levelId } = req.query;

    // Asking service to fetch grades
    const grades = await gradesService.getLevelGrades(user, schoolId, levelId);

    // Genereate the response object
    const response = {
      grades: grades.map((grade) => _.pick(grade, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};
