const commonMiddleware = require("../common");

const registerValidator = [
  commonMiddleware.checkName,
  commonMiddleware.checkEmail,
  commonMiddleware.checkPhone,
  commonMiddleware.checkPassword,
  commonMiddleware.checkAuthType,
  commonMiddleware.authTypeHandler,
];

const loginValidator = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkPassword,
  commonMiddleware.checkAuthType,
  commonMiddleware.authTypeHandler,
];

const resendCodeValidator = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkLanguage,
  commonMiddleware.next,
];

const codeValidator = [commonMiddleware.checkCode, commonMiddleware.next];

const getForgotPasswordCode = [
  commonMiddleware.putQueryParamsInBody,
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkLanguage,
  commonMiddleware.checkSendTo,
  commonMiddleware.next,
];

const forgotPasswordValidator = [
  commonMiddleware.checkEmailOrPhone,
  commonMiddleware.checkNewPassword,
  commonMiddleware.checkCode,
  commonMiddleware.next,
];

const resetPasswordValidator = [
  commonMiddleware.checkNewPassword,
  commonMiddleware.next,
];

module.exports = {
  loginValidator,
  registerValidator,
  resendCodeValidator,
  codeValidator,
  getForgotPasswordCode,
  forgotPasswordValidator,
  resetPasswordValidator,
};
