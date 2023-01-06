const { supportedGrades } = require("../../../models/school/sections/grade");

module.exports = Object.freeze({
  gradeExist: {
    en: "Grade has been already added",
    ar: "تم إضافة الصف بالفعل",
  },
  invalidGrade: {
    en: `Grade should be a number between ${supportedGrades.all[0]}-${
      supportedGrades.all[supportedGrades.all.length - 1]
    }`,
    ar: `الصف يحب أن يكون بين ${supportedGrades.all[0]}-${
      supportedGrades.all[supportedGrades.all.length - 1]
    }`,
  },
  noGrades: {
    en: "No grades registered yet",
    ar: "لا يوجد صفوف مسجلة بعد",
  },
  noSupportedGrades: {
    en: "There are no supported grades yet",
    ar: "لا يوجد صفوف مدعومة بعد",
  },
  notFound: {
    en: "Grade not found",
    ar: "الصف غير مسجل",
  },
  invalidId: {
    en: "Invalid grade id",
    ar: "معرّف الصف غير صالح",
  },
  noPhoto: {
    en: "Grade should have a photo",
    ar: "الصف يجب أن يكون له صورة",
  },
});
