const { title } = require("../../../models/school/sections/unit");

module.exports = Object.freeze({
  invalidTitle: {
    en: `Unit title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان الوحدة يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  unitExist: {
    en: "Unit for this subject has been already added",
    ar: "تم إضافة الوحدة لهذه المادة بالفعل",
  },
  noUnits: {
    en: "No units registered for this subject yet",
    ar: "لا يوجد وحدات مسجلة لهذه المادة بعد",
  },
  notFound: {
    en: "Unit not found",
    ar: "الوحدة غير مسجلة",
  },
  invalidId: {
    en: "Invalid unit id",
    ar: "معرّف الوحدة غير صالح",
  },
});
