const { title, description } = require("../../../models/tutorial/lesson/video");

module.exports = Object.freeze({
  notFound: {
    en: "Video not found",
    ar: "الفيديو غير موجود",
  },
  invalidTitle: {
    en: `Video title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان الفيديو يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  invalidURL: {
    en: "Invalid video url",
    ar: "رابط الفيديو غير صالح",
  },
  invalidDescription: {
    en: `Video description should be ${description.minLength}-${description.maxLength} characters length`,
    ar: `وصف الفيديو يجب أن يكون بين ${description.minLength}-${description.maxLength} حرفاً`,
  },
  noVideo: {
    en: "Please add either video or video url",
    ar: "من فضلك قم بإدخال فيديو أو رابط فيديو",
  },
  invalidType: {
    en: "Invalid video type",
    ar: "نوع الفيديو غير صالح",
  },
});
