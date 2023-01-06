const { title } = require("../../../models/school/sections/subject");

module.exports = Object.freeze({
  subjectExist: {
    en: "Subject for this season has been already added",
    ar: "تم إضافة المادة لهذا الفصل بالفعل",
  },
  noSubjects: {
    en: "No subjects registered for this season yet",
    ar: "لا يوجد مواد مسجلة لهذا الفصل بعد",
  },
  invalidTitle: {
    en: `Subject title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان المادة يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  invalidId: {
    en: "Invalid subject id",
    ar: "معرّف المادة غير صالح",
  },
  notFound: {
    en: "Subject not found",
    ar: "المادة غير مسجلة",
  },
  noPhoto: {
    en: "Subject should have a photo",
    ar: "المادة يجب أن يكون لها صورة",
  },
});
