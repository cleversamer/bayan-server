const { title } = require("../../../models/tutorial/quiz/question");

module.exports = Object.freeze({
  notFound: {
    en: "Quiz not found",
    ar: "الكويز غير موجود",
  },
  invalidTitle: {
    en: `Quiz title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان الكويز يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  notFound: {
    en: "Quiz not found",
    ar: "الكويز غير موجود",
  },
  invalidId: {
    en: "Invalid quiz id",
    ar: "معرّف الكويز غير صالح",
  },
});
