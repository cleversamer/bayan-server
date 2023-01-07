const { title } = require("../../../models/tutorial/lesson/document");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid document id",
    ar: "معرّف المستند غير صالح",
  },
  notFound: {
    en: "Document not found",
    ar: "الملف غير موجود",
  },
  invalidTitle: {
    en: `Document title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان المستند يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  invalidText: {
    en: "Document text should be (1 ~ 10,000 characters) length",
    ar: "نص المستند يجب أن يكون بين 1-10,000 حرفاً",
  },
});
