const system = Object.freeze({
  internal: {
    en: "An un expected error happened on the server",
    ar: "حصل خطأ في السيرفر الداخلي",
  },
  unsupportedRoute: {
    en: "Unsupported route",
    ar: "الرابط غير مدعوم",
  },
  noFile: {
    en: "Please add file, image, or video",
    ar: "يجب عليك إضافة ملف، صورة، أو فيديو",
  },
  invalidFile: {
    en: "Invalid file",
    ar: "الملف غير صالح",
  },
  fileUploadError: {
    en: "Error uploading file",
    ar: "حصل خطأ عند رفع الملف",
  },
  invalidUrl: {
    en: "Please add a valid url",
    ar: "من فضلك قم بإدخال رابط صالح",
  },
  invalidExtension: {
    en: "File extension is not supported",
    ar: "إمتداد الملف غير مدعوم",
  },
  errorExportingExcel: {
    en: "Error exporting excel file",
    ar: "حصل خطأ عند تصدير ملف الإكسل",
  },
});

const data = Object.freeze({
  invalidMongoId: {
    en: "Invalid document id",
    ar: "معرّف المستند غير صالح",
  },
  noMongoId: {
    en: "You should add the id",
    ar: "يجب عليك إضافة المعرّف",
  },
});

const auth = Object.freeze({
  invalidCode: {
    en: "Invalid verification code",
    ar: "الكود غير صالح",
  },
  incorrectCode: {
    en: "Incorrect verification code",
    ar: "الكود خاطئ",
  },
  expiredCode: {
    en: "Verification code is expired",
    ar: "الكود منتهي الصلاحية",
  },
  invalidToken: {
    en: "You're unauthorized",
    ar: "يجب عليك تسجيل الدخول",
  },
  invalidGoogleToken: {
    en: "Google user's token either not valid or expired",
    ar: "مُعرف مستخدم جوجل غير صالح أو منتهي الصلاحية",
  },
  hasNoRights: {
    en: "You don't have enough rights",
    ar: "ليس لديك الصلاحيات الكافية",
  },
  emailNotVerified: {
    en: "Your email is not verified",
    ar: "يحب عليك تفعيل بريدك الإلكتروني لتتمكن من استخدام النظام",
  },
  phoneNotVerified: {
    en: "Your phone number is not verified",
    ar: "يحب عليك تفعيل رقم هاتفك لتتمكن من استخدام النظام",
  },
  emailNotUsed: {
    en: "Email is not used",
    ar: "البريد الإلكتروني غير مستخدم",
  },
  emailOrPhoneUsed: {
    en: "Email or phone number is already used",
    ar: "البريد الإلكتروني أو رقم الهاتف مستخدم بالفعل",
  },
  phoneNotUsed: {
    en: "Phone number is already used",
    ar: "رقم الهاتف مسجل بالفعل",
  },
  incorrectCredentials: {
    en: "Incorrect email or password",
    ar: "البريد الإلكتروني أو كلمة المرور غير صحيح",
  },
  invalidEmail: {
    en: "Invalid email address",
    ar: "البريد الإلكتروني غير صالح",
  },
  invalidEmailOrPhone: {
    en: "Invalid email address or phone number",
    ar: "البريد الإلكتروني أو رقم الهاتف غير صالح",
  },
  incorrectEmailOrPhone: {
    en: "Incorrect email address or phone number",
    ar: "البريد الإلكتروني أو رقم الهاتف خاطئ",
  },
  invalidPhone: {
    en: "Invalid phone number",
    ar: "رقم الهاتف غير صالح",
  },
  invalidCountryCode: {
    en: "Invalid country code",
    ar: "مقدمة الدولة غير صالحة",
  },
  invalidPassword: {
    en: "Password should be (8 ~ 32 characters) length",
    ar: "كلمة المرور يجب أن تكون بين 8-32 حرفا",
  },
  invalidName: {
    en: "Name should be (8 ~ 64 characters) length",
    ar: "الإسم يجب أن يكون بين 8-64 حرفا",
  },
  invalidAuthType: {
    en: "Auth type should be either email or google",
    ar: "نوع المصادقة يجب أن يكون إما عبر البريد أو جوجل",
  },
  googleAccNotRegistered: {
    en: "Google account is not registered",
    ar: "حساب جوجل غير مسجل",
  },
});

const user = Object.freeze({
  invalidId: {
    en: "Invalid user id",
    ar: "معرّف المستخدم غير صالح",
  },
  notFound: {
    en: "User was not found",
    ar: "المستخدم غير موجود",
  },
  alreadyVerified: {
    en: "User is already verified",
    ar: "تم التحقق من البريد مسبقا",
  },
  noUpdateInfo: {
    en: "No update info",
    ar: "لا يوجد بيانات جديدة لتحديثها",
  },
  invalidRole: {
    en: "Invalid user role",
    ar: "الصلاحية المختارة غير صالحة",
  },
});

const level = Object.freeze({
  invalidTitle: {
    en: "Level title should be (1 ~ 64 characters) length",
    ar: "عنوان المرحلة يجب أن يكون بين 1-64 حرفاً",
  },
  invalidLevel: {
    en: "Level should be either primary, middle or high",
    ar: "المرحلة التعليمية يجب أن تكون إما أبتدائي أو إعدادي أو ثانوي",
  },
  notFound: {
    en: "Level not found",
    ar: "المرحلة التعليمية غير مسجل",
  },
  noLevels: {
    en: "No levels registered yet",
    ar: "لا يوجد مراحل تعليمية مسجلة بعد",
  },
  levelExist: {
    en: "Level has been already added",
    ar: "تم إضافة المرحلة الدراسية بالفعل",
  },
  invalidId: {
    en: "Invalid level id",
    ar: "معرّف المرحلة التعليمية غير صالح",
  },
  gradeNotAccepted: {
    en: "Grade is not included in this level",
    ar: "هذا الصف ليس من ضمن هذه المرحلة التعليمية",
  },
});

const grade = Object.freeze({
  gradeExist: {
    en: "Grade has been already added",
    ar: "تم إضافة الصف بالفعل",
  },
  invalidGrade: {
    en: "Grade should be a number between 1-12",
    ar: "الصف يجب أن يكون بين 1-12",
  },
  noGrades: {
    en: "No grades registered yet",
    ar: "لا يوجد صفوف مسجلة بعد",
  },
  noSupportedGrades: {
    en: "There are no supported grades yet",
    ar: "لا يوجد صفوف مدعومة بعد",
  },
  notFound: {
    en: "Grade not found",
    ar: "الصف غير مسجل",
  },
  invalidId: {
    en: "Invalid grade id",
    ar: "معرّف الصف غير صالح",
  },
  noPhoto: {
    en: "Grade should have a photo",
    ar: "الصف يجب أن يكون له صورة",
  },
});

const season = Object.freeze({
  invalidSeason: {
    en: "Season number should be a number between 1-4",
    ar: "رقم الفصل يجب أن تكون بين 1-4",
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
});

const subject = Object.freeze({
  subjectExist: {
    en: "Subject for this season has been already added",
    ar: "تم إضافة المادة لهذا الفصل بالفعل",
  },
  noSubjects: {
    en: "No subjects registered for this season yet",
    ar: "لا يوجد مواد مسجلة لهذا الفصل بعد",
  },
  invalidTitle: {
    en: "Subject title should be (1 ~ 64 characters) length",
    ar: "عنوان المادة يجب أن يكون بين 1-64 حرفاً",
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

const unit = Object.freeze({
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

const lesson = Object.freeze({
  invalidLesson: {
    en: "Lesson should be either video",
    ar: "الصف يجب أن يكون بين 1-12",
  },
  invalidTitle: {
    en: "Lesson title should be (1 ~ 64 characters) length",
    ar: "عنوان الدرس يجب أن يكون بين 1-64 حرفاً",
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

const document = Object.freeze({
  notFound: {
    en: "Document not found",
    ar: "الملف غير موجود",
  },
  invalidTitle: {
    en: "Document title should be (1 ~ 64 characters) length",
    ar: "عنوان المستند يجب أن يكون بين 1-64 حرفاً",
  },
  invalidText: {
    en: "Document text should be (1 ~ 10,000 characters) length",
    ar: "نص المستند يجب أن يكون بين 1-10,000 حرفاً",
  },
});

const video = Object.freeze({
  notFound: {
    en: "Video not found",
    ar: "الفيديو غير موجود",
  },
  invalidTitle: {
    en: "Video title should be (1 ~ 64 characters) length",
    ar: "عنوان الفيديو يجب أن يكون بين 1-64 حرفاً",
  },
  invalidURL: {
    en: "Invalid video url",
    ar: "رابط الفيديو غير صالح",
  },
  invalidDescription: {
    en: "Video description should be (1 ~ 1024 characters) length",
    ar: "وصف الفيديو يجب أن يكون بين 1-1024 حرفاً",
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

const quiz = Object.freeze({
  notFound: {
    en: "Quiz not found",
    ar: "الكويز غير موجود",
  },
  invalidTitle: {
    en: "Quiz title should be (1 ~ 64 characters) length",
    ar: "عنوان الكويز يجب أن يكون بين 1-64 حرفاً",
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

const question = Object.freeze({
  invalidId: {
    en: "Invalid question id",
    ar: "معرّف السؤال غير واضح",
  },
  invalidTitle: {
    en: "Question title should be (1 ~ 512 characters) length",
    ar: "عنوان السؤال يجب أن يكون بين 1-512 حرفاً",
  },
  invalidOptionsType: {
    en: "Options should be a set of text",
    ar: "الخيارات يجب أن تكون مجموعة من النصوص",
  },
  invalidOptionsLength: {
    en: "Options set should be (1 ~ 4 options) length",
    ar: "عدد خيارات السؤال يجب أن تكون بين 2-4 خيارات",
  },
  invalidOptionLength: {
    en: "Option should be (1 ~ 5 characters) length",
    ar: "طول الخيار يجب أن يكون بين 1-256 حرفاً",
  },
  invalidAnswerType: {
    en: "Answer should be a text",
    ar: "الإجابة يجب أن تكون نص",
  },
  invalidAnswerLength: {
    en: "Answer be (1 ~ 5 characters) length",
    ar: "طول الإجابة يجب أن يكون بين 1-256 حرفاً",
  },
  answerNotMatchOption: {
    en: "Answer does not match any option",
    ar: "الإجابة لا تطابق أيّ من الخيارات",
  },
});

const submission = Object.freeze({
  answersNotArray: {
    en: "Answers should be an array of objects",
    ar: "شكل الإجابات غير صحيح",
  },
});

const package = Object.freeze({
  invalidNumOfSubjectsType: {
    en: "Package includes at least 1 subject",
    ar: "الباقة تحتوي على مادة واحدة على الأقل",
  },
  invalidNumOfSubjects: {
    en: "Invalid subjects number",
    ar: "عدد المواد غير صالح",
  },
  invalidPrice: {
    en: "Price should be at least $10",
    ar: "السعر يجب أن يكون على الأقل 10 دولارات",
  },
  invalidMonths: {
    en: "Months should be between 1-12",
    ar: "عدد الشهور يجب أن يكون بين 1-12",
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

const subscription = Object.freeze({
  notFound: {
    en: "Subscription not found",
    ar: "الإشتراك غير موجود",
  },
  subjectNotFound: {
    en: "Subscription does not include this subject",
    ar: "الإشتراك لا يتضمن هذه المادة",
  },
  invalidId: {
    en: "Invalid subscription id",
    ar: "معرّف الإشتراك غير صالح",
  },
  noSubjectsAdded: {
    en: "Please choose at least on subject",
    ar: "من فضلك قم باختيار مادة واحدة على الأقل",
  },
  alreadySubscriped: {
    en: "You are already subscribed to this package",
    ar: "أنت مشترك في هذه الباقة بالفعل",
  },
  invalidSubjects: {
    en: "One or all of selected subjects are invalid",
    ar: "واحدة أو كل المواد المختارة غير صالحة",
  },
  subjectsNotEqual: {
    en: "Subjects added are not equal number of subjects in the package",
    ar: "عدد المواد المضافة لا تساوي عدد المواد المحددة في الباقة",
  },
  noSubscriptions: {
    en: "You haven't subscribed to any package",
    ar: "أنت غير مشترك في أيّ باقة",
  },
  subjectsSelectedNotAllowed: {
    en: "Some or all of selected subjects are not included in this package",
    ar: "بعض المواد المختارة أو كلها ليس من ضمن هذه الباقة",
  },
  subjectSelectedNotAllowed: {
    en: "Selected subject is not included in this package",
    ar: "المادة المختارة ليست من ضمن هذه الباقة",
  },
  notAllFound: {
    en: "Some or all of selected subjects are not found",
    ar: "بعض المواد المختارة أو كلها ليست موجودة",
  },
  subjectsSelectedExist: {
    en: "You're already subscribed to some or all of selected subjects",
    ar: "أنت مشترك بالفعل في بعض أو كل المواد التي اخترتها",
  },
  subjectAlreadyAdded: {
    en: "Subject is already added to this subscription",
    ar: "المادة مضافة بالفعل لهذا الإشتراك",
  },
  maximumSubjectsReached: {
    en: "Maximum subjects for this package is reached",
    ar: "تم الوصول إلى الحد الأقصى للمواد المسموحة لهذه الباقة",
  },
  notActive: {
    en: "Your subscription is not active",
    ar: "إشتراكك غير مفعل",
  },
  subjectNotActive: {
    en: "Subject in your subscription is not active",
    ar: "المادة غير مفعلة في الإشتراك",
  },
});

const codes = Object.freeze({
  duplicateIndexKey: 11000,
});

module.exports = {
  system,
  data,
  auth,
  user,
  codes,
  level,
  grade,
  season,
  subject,
  unit,
  lesson,
  document,
  video,
  quiz,
  question,
  submission,
  package,
  subscription,
};
