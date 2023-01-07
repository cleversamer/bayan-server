const {
  numOfSubjects,
  price,
  months,
} = require("../../../config/models/subscription/package");

module.exports = Object.freeze({
  invalidNumOfSubjects: {
    en: `Package includes ${numOfSubjects.min}-${numOfSubjects.max} subjects`,
    ar: `الباقة تحتوي على ${numOfSubjects.min}-${numOfSubjects.max} مواد`,
  },
  invalidPrice: {
    en: `Price should be between $${price.min} - $${price.max}`,
    ar: `السعر يجب أن يكون بين $${price.min} - $${price.max}`,
  },
  invalidMonths: {
    en: `Months should be between ${months.min}-${months.max}`,
    ar: `عدد الشهور يجب أن يكون بين ${months.min}-${months.max}`,
  },
  notFound: {
    en: "Package not found",
    ar: "الباقة غير موجودة",
  },
  noPackages: {
    en: "No packages registered for this grade",
    ar: "لا يوجد باقات مسجلة لهذا الصف",
  },
  invalidId: {
    en: "Invalid package id",
    ar: "معرف الباقة غير صالح",
  },
  alreadyAdded: {
    en: "Package with same data has already been added",
    ar: "تم إضافة باقة مطابقة لهذه الباقة لهذا الصف بالفعل",
  },
});
