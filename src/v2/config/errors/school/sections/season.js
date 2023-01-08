const { supportedSeasons } = require("../../../models/school/sections/season");

module.exports = Object.freeze({
  invalidSeason: {
    en: `Season number should be a number between ${supportedSeasons[0]}-${
      supportedSeasons[supportedSeasons.length - 1]
    }`,
    ar: `رقم الفصل يجب أن يكون بين ${supportedSeasons[0]}-${
      supportedSeasons[supportedSeasons.length - 1]
    }`,
  },
  noSeasons: {
    en: "No seasons registered for this grade yet",
    ar: "لا يوجد فصول مسجلة لهذا الصف بعد",
  },
  seasonExist: {
    en: "Season for this grade has been already added",
    ar: "تم إضافة الفصل لهذا الصف بالفعل",
  },
  notFound: {
    en: "Season not found",
    ar: "الفصل غير مسجل",
  },
  invalidId: {
    en: "Invalid season id",
    ar: "معرّف الفصل غير صالح",
  },
  noPhoto: {
    en: "Season should have a photo",
    ar: "الفصل يجب أن يكون له صورة",
  },
  notBelongToSchool: {
    en: "Season does not belong to your school",
    ar: "الفصل الدراسي لا تنتمي إلى مدرستك",
  },
});
