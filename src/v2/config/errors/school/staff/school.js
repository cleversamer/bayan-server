const { name } = require("../../../models/school/staff/school");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid school id",
    ar: "معرّف المدرسة غير صالح",
  },
  invalidName: {
    en: `School name should be ${name.minLength}-${name.maxLength} characters length`,
    ar: `إسم المدرسة يجب أن يكون بين ${name.minLength}-${name.maxLength} حرفًا`,
  },
  notFound: {
    en: "School was not found",
    ar: "المدرسة غير موجودة",
  },
  noSchools: {
    en: "There are no schools out there",
    ar: "لا يوجد هناك مدارس مسجّلة بعد",
  },
  noInactiveSchools: {
    en: "There are no inactive schools out there",
    ar: "لا يوجد هناك مدارس غير نشطة بعد",
  },
  alreadyActive: {
    en: "School is already active",
    ar: "المدرسة نشطة بالفعل",
  },
});
