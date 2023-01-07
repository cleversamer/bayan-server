const AccessControl = require("accesscontrol");
const student = require("./student");
const teacher = require("./teacher");
const manager = require("./manager");
const admin = require("./admin");

const roles = new AccessControl({
  student,
  teacher,
  manager,
  admin,
});

module.exports = roles;
