const { clientSchema } = require("../../../models/school/staff/school.model");
const { schoolsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

module.exports.getAllSchools = async (req, res, next) => {
  try {
    const { skip } = req.query;

    // Asking service to find all schools
    const schools = await schoolsService.getAllSchools(skip);

    // Genereate the response object
    const response = {
      schools: schools.map((school) => _.pick(school, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.OK).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.createSchool = async (req, res, next) => {
  try {
    const user = req.user;
    const { name } = req.body;

    // Asking service to create a new school
    const school = await schoolsService.createSchool(user, name);

    // Genereate the response object
    const response = _.pick(school, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.getInActiveSchools = async (req, res, next) => {
  try {
    const { skip } = req.query;

    // Asking service to find all inactive schools
    const schools = await schoolsService.getInActiveSchools(skip);

    // Genereate the response object
    const response = {
      schools: schools.map((school) => _.pick(school, clientSchema)),
    };

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports.activateSchool = async (req, res, next) => {
  try {
    const { schoolId } = req.params;

    // Asking service to activate school
    const school = await schoolsService.activateSchool(schoolId);

    // Genereate the response object
    const response = _.pick(school, clientSchema);

    // Send the data back to the client
    res.status(httpStatus.CREATED).json(response);
  } catch (err) {
    next(err);
  }
};
