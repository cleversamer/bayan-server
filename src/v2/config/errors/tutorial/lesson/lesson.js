const { title } = require("../../../models/tutorial/lesson/lesson");

module.exports = Object.freeze({
  invalidLesson: {
    en: "Lesson should be either video",
    ar: "الصف يجب أن يكون بين 1-12",
  },
  invalidTitle: {
    en: `Lesson title should be ${title.minLength}-${title.maxLength} characters length`,
    ar: `عنوان الدرس يجب أن يكون بين ${title.minLength}-${title.maxLength} حرفاً`,
  },
  noLessons: {
    en: "No lessons registered for this unit yet",
    ar: "لا يوجد دروس مسجلة لهذه الوحدة الدراسية بعد",
  },
  lessonExist: {
    en: "Lesson for this unit has been already added",
    ar: "تم إضافة الدرس لهذه الوحدة الدراسية بالفعل",
  },
  notFound: {
    en: "Lesson not found",
    ar: "الدرس غير مسجل",
  },
  invalidId: {
    en: "Invalid lesson id",
    ar: "معرّف الدرس غير صالح",
  },
  documentAdded: {
    en: "Document is already added to this lesson",
    ar: "تم إضافة ملف لهذا الدرس بالفعل",
  },
  quizAdded: {
    en: "Quiz is already added to this lesson",
    ar: "تم إضافة كويز لهذا الدرس بالفعل",
  },
  videoAdded: {
    en: "Video is already added to this lesson",
    ar: "تم إضافة فيديو لهذا الدرس بالفعل",
  },
  notSubscribed: {
    en: "This lesson is not in any of your subscribed subjects",
    ar: "هذا الدرس ليس من ضمن المواد المشترك بها",
  },
});
