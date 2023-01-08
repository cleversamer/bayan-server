const commonMiddleware = require("../../common");

const validateCreateSchool = [
  commonMiddleware.checkSchoolName,
  commonMiddleware.next,
];

module.exports = {
  validateCreateSchool,
};
