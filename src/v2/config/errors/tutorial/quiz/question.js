const {
  title,
  options,
  option,
  answer,
} = require("../../../models/tutorial/quiz/question");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid question id",
    ar: "معرّف السؤال غير واضح",
  },
  invalidTitle: {
    en: `Question title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان السؤال يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  invalidOptionsType: {
    en: "Options should be a set of text",
    ar: "الخيارات يجب أن تكون مجموعة من النصوص",
  },
  invalidOptionsLength: {
    en: `Options set should be ${options.min}-${options.max} options length`,
    ar: `عدد خيارات السؤال يجب أن تكون بين ${options.min}-${options.max} خيارات`,
  },
  invalidOptionLength: {
    en: `Option should be ${option.minLength}-${option.maxLength} characters length`,
    ar: `طول الخيار يجب أن يكون بين ${option.minLength}-${option.maxLength} حرفاً`,
  },
  invalidAnswerType: {
    en: "Answer should be a text",
    ar: "الإجابة يجب أن تكون نص",
  },
  invalidAnswerLength: {
    en: `Answer be ${answer.minLength}-${answer.maxLength} characters length`,
    ar: `طول الإجابة يجب أن يكون بين ${answer.minLength}-${answer.maxLength} حرفاً`,
  },
  answerNotMatchOption: {
    en: "Answer does not match any option",
    ar: "الإجابة لا تطابق أيّ من الخيارات",
  },
});
