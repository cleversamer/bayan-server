const { clientSchema } = require("../../../models/school/staff/school.model");
const { schoolsService } = require("../../../services");
const httpStatus = require("http-status");
const _ = require("lodash");

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
