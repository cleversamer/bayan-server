const AccessControl = require("accesscontrol");
const student = require("./student");
const teacher = require("./teacher");
const admin = require("./admin");

const roles = new AccessControl({
  student,
  teacher,
  admin,
});

module.exports = roles;
