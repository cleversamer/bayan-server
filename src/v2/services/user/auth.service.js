const { User } = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const usersService = require("./users.service");
const googleService = require("./google.service");

module.exports.createUser = async (
  email,
  password,
  name,
  phone,
  authType,
  googleToken
) => {
  try {
    switch (authType) {
      case "email":
        return await registerWithEmail(email, password, name, phone);

      case "google":
        return await registerWithGoogle(googleToken, phone);

      default:
        return await registerWithEmail(email, password, name, phone);
    }
  } catch (err) {
    throw err;
  }
};

const registerWithEmail = async (email, password, name, phone) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashed,
      name,
      phone,
      authType: "email",
      lastLogin: new Date(),
    });

    return await user.save();
  } catch (err) {
    throw err;
  }
};

const registerWithGoogle = async (googleToken, phone) => {
  try {
    const googleUser = await googleService.decodeToken(googleToken);
    const registeredUser = await usersService.findUserByEmailOrPhone(
      googleUser.email
    );

    if (registeredUser) {
      return registeredUser;
    }

    const newUser = new User({
      email: googleUser.email,
      name: googleUser.name,
      phone,
      verified: {
        email: true,
        phone: false,
      },
      authType: "google",
      lastLogin: new Date(),
    });

    return await newUser.save();
  } catch (err) {
    throw err;
  }
};

module.exports.login = async (
  emailOrPhone,
  password,
  googleToken,
  authType
) => {
  try {
    switch (authType) {
      case "email":
        return await loginWithEmailOrPhone(emailOrPhone, password);

      case "google":
        return await loginWithGoogle(googleToken);

      default:
        return await loginWithEmailOrPhone(emailOrPhone, password);
    }
  } catch (err) {
    throw err;
  }
};

const loginWithEmailOrPhone = async (emailOrPhone, password) => {
  try {
    const user = await usersService.findUserByEmailOrPhone(emailOrPhone);

    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.incorrectCredentials;
      throw new ApiError(statusCode, message);
    }

    if (!(await user.comparePassword(password))) {
      const statusCode = httpStatus.UNAUTHORIZED;
      const message = errors.auth.incorrectCredentials;
      throw new ApiError(statusCode, message);
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};

const loginWithGoogle = async (googleToken) => {
  try {
    const googleUser = await googleService.decodeToken(googleToken);
    const user = await usersService.findUserByEmailOrPhone(googleUser.email);

    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.googleAccNotRegistered;
      throw new ApiError(statusCode, message);
    }

    user.lastLogin = new Date();
    await user.save();

    return user;
  } catch (err) {
    throw err;
  }
};
