const { User } = require("../../models/user/user.model");
const httpStatus = require("http-status");
const emailService = require("../mail/email.service");
const localStorage = require("../storage/localStorage.service");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");

module.exports.resendEmailOrPhoneVerificationCode = async (key, user, lang) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Update user's email or phone verification code
    // Send code in a message to user's email or phone
    // Save user
    user.updateCode(key);
    await user.save();

    // Sending email or phone verification code to user's email or phone
    if (key === "email")
      await emailService.registerEmail(lang, user.email, user);

    // TODO: send phone verification code to user's phone
  } catch (err) {
    throw err;
  }
};

module.exports.verifyEmailOrPhone = async (key, user, code) => {
  try {
    // Ensure that key is correct
    key = key.toLowerCase();
    if (!["email", "phone"].includes(key)) {
      key = "email";
    }

    // Check if user's email or phone is verified
    const isVerified =
      key === "email" ? user.isEmailVerified() : user.isPhoneVerified();
    if (isVerified) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user[`${key}AlreadyVerified`];
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode(key, code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode(key);
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email or phone
    if (key === "email") {
      user.verifyEmail();
    } else {
      user.verifyPhone();
    }

    return await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports.sendForgotPasswordCode = async (emailOrPhone, sendTo, lang) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailOrPhoneNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Update password reset code
    user.updateCode("password");
    const updatedUser = await user.save();

    // Send password reset code to phone or
    if (sendTo === "phone") {
      // TODO: send forgot password code to user's phone.
    } else {
      await emailService.forgotPasswordEmail(lang, user.email, updatedUser);
    }
  } catch (err) {
    throw err;
  }
};

module.exports.handleForgotPassword = async (
  emailOrPhone,
  code,
  newPassword
) => {
  try {
    // Check if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.emailOrPhoneNotUsed;
      throw new ApiError(statusCode, message);
    }

    // Check if code is correct
    const isCorrectCode = user.isMatchingCode("password", code);
    if (!isCorrectCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.incorrectCode;
      throw new ApiError(statusCode, message);
    }

    // Check if code is expired
    const isValidCode = user.isValidCode("password");
    if (!isValidCode) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.expiredCode;
      throw new ApiError(statusCode, message);
    }

    // Update password
    await user.updatePassword(newPassword);

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.changePassword = async (user, oldPassword, newPassword) => {
  try {
    // Decoding user's password and comparing it with the old password
    if (!(await user.comparePassword(oldPassword))) {
      const statusCode = httpStatus.UNAUTHORIZED;
      const message = errors.auth.incorrectOldPassword;
      throw new ApiError(statusCode, message);
    }

    // Decoding user's password and comparing it with the new password
    if (await user.comparePassword(newPassword)) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.oldPasswordMatchNew;
      throw new ApiError(statusCode, message);
    }

    // Update password
    await user.updatePassword(newPassword);

    // Save user
    await user.save();
  } catch (err) {
    throw err;
  }
};

module.exports.updateProfile = async (
  lang,
  user,
  name,
  email,
  phone,
  avatar
) => {
  try {
    const body = {
      lang,
      name,
      email,
      phone,
      avatar,
    };

    return await updateUserProfile(user, body);
  } catch (err) {
    throw err;
  }
};

module.exports.updateUserProfile = async (
  lang,
  emailOrPhone,
  name,
  email,
  phone,
  avatar
) => {
  try {
    // Checking if user exists
    const user = await this.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    const body = {
      lang,
      name,
      email,
      phone,
      avatar,
    };

    return await updateUserProfile(user, body);
  } catch (err) {
    throw err;
  }
};

///////////////////////////// ADMIN /////////////////////////////
module.exports.changeUserRole = async (userId, role) => {
  try {
    // Check if user exists
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Update user's role
    user.updateRole(role);

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.findUserByEmailOrPhone = async (
  emailOrPhone,
  role = "",
  withError = false
) => {
  try {
    // Find a user with the specified email or phone
    const user = await User.findOne({
      $or: [
        { email: { $eq: emailOrPhone } },
        { "phone.full": { $eq: emailOrPhone } },
      ],
    });

    // Check if user exists or exist with another role
    const notFound = !user || (user && role && user.role !== role);
    if (withError && notFound) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.verifyUser = async (userId) => {
  try {
    // Check if user exists
    const user = await this.findUserById(userId);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.user.notFound;
      throw new ApiError(statusCode, message);
    }

    // Check if user is already verified
    if (user.isEmailVerified() && user.isPhoneVerified()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.alreadyVerified;
      throw new ApiError(statusCode, message);
    }

    // Verify user's email
    user.verifyEmail();

    // Verify user's password
    user.verifyPassword();

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};

//////////////////// INRERNAL SERVICES ////////////////////
const updateUserProfile = async (user, body) => {
  try {
    const { name, avatar, email, phone, lang } = body;

    // To store data changes
    const changes = [];

    // Updating name when there's new name
    if (name && user.name !== name) {
      user.name = name;
      changes.push("name");
    }

    // Updating avatar when there's new avatar
    if (avatar) {
      const file = await localStorage.storeFile(avatar);
      await localStorage.deleteFile(user.avatarURL);
      user.avatarURL = file.path;
      changes.push("avatarURL");
    }

    // Updating email, setting email as not verified,
    // update email verification code, and sending
    // email verification code to user's email
    if (email && user.email !== email) {
      // Checking if email used
      const emailUsed = await this.findUserByEmailOrPhone(email);
      if (emailUsed) {
        const statusCode = httpStatus.NOT_FOUND;
        const message = errors.auth.emailUsed;
        throw new ApiError(statusCode, message);
      }

      // Updating email, setting email as not verified,
      // update email verification code, and sending
      // email verification code to user's email
      user.email = email;
      user.verified.email = false;
      changes.push("email");
      user.updateCode("email");
      await emailService.changeEmail(lang, email, user);
    }

    // Updating phone, setting phone as not verified,
    // update phone verification code, and sending
    // phone verification code to user's phone
    const isPhoneEqual =
      user.phone.icc === phone?.icc && user.phone.nsn === phone?.nsn;
    if (phone && !isPhoneEqual) {
      // Checking if phone used
      const fullPhone = `${phone.icc}${phone.nsn}`;
      const phoneUsed = await this.findUserByEmailOrPhone(fullPhone);
      if (phoneUsed) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.auth.phoneUsed;
        throw new ApiError(statusCode, message);
      }

      // Updating email, setting email as not verified,
      // update email verification code, and sending
      // email verification code to user's email
      user.phone = {
        full: `${phone.icc}${phone.nsn}`,
        icc: phone.icc,
        nsn: phone.nsn,
      };
      user.verified.phone = false;
      changes.push("phone");
      user.updateCode("phone");

      // TODO: send phone verification code to user's email.
    }

    if (!changes.length) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.user.notUpdated;
      throw new ApiError(statusCode, message);
    }

    user = await user.save();

    return { newUser: user, changes };
  } catch (err) {
    throw err;
  }
};
