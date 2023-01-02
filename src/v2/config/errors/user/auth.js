const {
  name,
  email,
  password,
  verificationCode,
} = require("../../models/user");

module.exports = Object.freeze({
  invalidName: {
    en: `Name should be ${name.minLength}-${name.maxLength} characters length`,
    ar: `الإسم يجب أن يكون بين ${name.minLength}-${name.maxLength} حرفًا`,
  },
  invalidEmail: {
    en: `Email should be valid and ${email.minLength}-${email.maxLength}`,
    ar: `البريد الإلكرتروني يجب أن يكون بريد صالح بين ${email.minLength}-${email.maxLength} حرفًا`,
  },
  invalidPhone: {
    en: "Invalid phone number",
    ar: "رقم الهاتف غير صالح",
  },
  invalidICC: {
    en: "Invalid international calling code (ICC)",
    ar: "مقدّمة الدولة غير صالحة",
  },
  invalidEmailOrPhone: {
    en: "Invalid email or phone number",
    ar: "البريد الإلكتروني أو رقم الهاتف غير صالح",
  },
  invalidPassword: {
    en: `Password should be ${password.minLength}-${password.maxLength} characters length`,
    ar: `كلمة المرور يجب أن تكون بين ${password.minLength}-${password.maxLength} حرفًا`,
  },
  invalidOldPassword: {
    en: `Old password should be ${password.minLength}-${password.maxLength} characters length`,
    ar: `كلمة المرور القديمة يجب أن تكون بين ${password.minLength}-${password.maxLength} حرفًا`,
  },
  invalidNewPassword: {
    en: `New password should be ${password.minLength}-${password.maxLength} characters length`,
    ar: `كلمة المرور الجديدة يجب أن تكون بين ${password.minLength}-${password.maxLength} حرفًا`,
  },
  invalidAuthType: {
    en: "Auth type should be either email or google",
    ar: "نوع المصادقة يجب أن يكون إما عبر البريد أو جوجل",
  },
  invalidCode: {
    en: `Verification code should be ${verificationCode.exactLength} characters length`,
    ar: `كود التحقق يجب أن يكون ${verificationCode.exactLength} حرفًا`,
  },
  emailOrPhoneUsed: {
    en: "Email or phone number is already used",
    ar: "البريد الإلكتروني أو رقم الهاتف مستخدم مسبقًا",
  },
  incorrectCredentials: {
    en: "Incorrect credentials",
    ar: "بيانات الدخول غير صحيحة",
  },
  googleAccNotRegistered: {
    en: "Google account is not registered",
    ar: "حساب جوجل غير مسجل",
  },
  invalidGoogleToken: {
    en: "Google user's token either not valid or expired",
    ar: "مُعرف مستخدم جوجل غير صالح أو منتهي الصلاحية",
  },
  incorrectCode: {
    en: "Incorrect verification code",
    ar: "كود التحقق غير صحيح",
  },
  expiredCode: {
    en: "Verification code is expired",
    ar: "كود التحقق منتهي الصلاحيّة",
  },
  emailNotUsed: {
    en: "Email is not used",
    ar: "البريد الإلكتروني غير مستخدم",
  },
  emailOrPhoneNotUsed: {
    en: "Email or phone number is not used",
    ar: "البريد الإلكتروني أو رقم الهاتف غير مستخدم",
  },
  invalidToken: {
    en: "You have to login in order to perform this action",
    ar: "يجب عليك تسجيل الدخول لتقوم بهذه العمليّة",
  },
  emailNotVerified: {
    en: "Your email is not verified",
    ar: "يحب عليك تفعيل بريدك الإلكتروني لتتمكن من استخدام النظام",
  },
  hasNoRights: {
    en: "You don’t have enough rights",
    ar: "ليس لديك الصلاحيّات الكافية",
  },
  ////////////////////////////////////////
  // phoneNotVerified: {
  //   en: "You have to verify your phone number to continue using the app",
  //   ar: "يجب عليك تفعيل رقم هاتفك لتتمكن من إستخدام التطبيق",
  // },
  // emailUsed: {
  //   en: "Email address is already used",
  //   ar: "البريد الإلكتروني مستخدم مسبقًا",
  // },
  // phoneUsed: {
  //   en: "Phone number is already used",
  //   ar: "رقم الهاتف مستخدم مسبقًا",
  // },
  // incorrectOldPassword: {
  //   en: "Old password is incorrect",
  //   ar: "كلمة المرور القديمة غير صحيحة",
  // },
  // oldPasswordMatchNew: {
  //   en: "New password matches old password",
  //   ar: "كلمة المرور الجديدة تطابق كلمة المرور القديمة",
  // },
  // phoneNotOnlyNumbers: {
  //   en: "Phone number should contain only numbers",
  //   ar: "رقم الهاتف يجب أن يحتوي على أرقام فقط",
  // },
  // invalidDeviceToken: {
  //   en: "Invalid device token",
  //   ar: "معرّف الجهاز غير صالح",
  // },
  // invalidCountryCode: {
  //   en: "Invalid country code",
  //   ar: "مقدمة الدولة غير صالحة",
  // },
  // phoneNotVerified: {
  //   en: "Your phone number is not verified",
  //   ar: "يحب عليك تفعيل رقم هاتفك لتتمكن من استخدام النظام",
  // },
});
