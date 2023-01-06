const { title } = require("../../models/level");

module.exports = Object.freeze({
  invalidTitle: {
    en: `Level title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان المرحلة يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  invalidLevel: {
    en: "Level should be either primary, middle or high",
    ar: "المرحلة التعليمية يجب أن تكون إما أبتدائي أو إعدادي أو ثانوي",
  },
  notFound: {
    en: "Level not found",
    ar: "المرحلة التعليمية غير مسجل",
  },
  noLevels: {
    en: "No levels registered yet",
    ar: "لا يوجد مراحل تعليمية مسجلة بعد",
  },
  levelExist: {
    en: "Level has been already added",
    ar: "تم إضافة المرحلة الدراسية بالفعل",
  },
  invalidId: {
    en: "Invalid level id",
    ar: "معرّف المرحلة التعليمية غير صالح",
  },
  gradeNotAccepted: {
    en: "Grade is not included in this level",
    ar: "هذا الصف ليس من ضمن هذه المرحلة التعليمية",
  },
});
