const { name } = require("../../../models/school/staff/school");

module.exports = Object.freeze({
  invalidName: {
    en: `School name should be ${name.minLength}-${name.maxLength} characters length`,
    ar: `إسم المدرسة يجب أن يكون بين ${name.minLength}-${name.maxLength} حرفًا`,
  },
});
