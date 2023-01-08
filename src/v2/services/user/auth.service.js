const { User } = require("../../models/user/user.model");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const usersService = require("./users.service");
const googleService = require("../mail/google.service");

module.exports.createUser = async (
  email,
  password,
  name,
  phone,
  authType,
  googleToken,
  role
) => {
  try {
    if (authType === "email") {
      // Create a new user using email and phone
      return await registerWithEmail(email, password, name, phone, role);
    } else {
      // Creating a new user using Google account
      return await registerWithGoogle(googleToken, phone, role);
    }
  } catch (err) {
    throw err;
  }
};

const registerWithEmail = async (email, password, name, phone, role) => {
  try {
    // Create an instance of the User model
    const user = new User({
      name,
      email,
      phone: {
        full: phone.icc + phone.nsn,
        icc: phone.icc,
        nsn: phone.nsn,
      },
      authType: "email",
      role,
      lastLogin: new Date(),
    });

    // Update user's password
    await user.updatePassword(password);

    // Update user's email verification code
    user.updateCode("email");

    // Update user's phone verification code
    user.updateCode("phone");

    // Save the user to the DB
    await user.save();

    return user;
  } catch (err) {
    // Check if the error is about a duplicate index key
    // in unique values which are (email, phone)
    // and notify the client with the error.
    if (err.code === errors.codes.duplicateIndexKey) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.auth.emailOrPhoneUsed;
      err = new ApiError(statusCode, message);
    }

    throw err;
  }
};

const registerWithGoogle = async (googleToken, phone, role) => {
  try {
    // Get the user data via google token
    const googleUser = await googleService.decodeToken(googleToken);

    // Check if there is a user registered with the specified email
    const registeredUser = await usersService.findUserByEmailOrPhone(
      googleUser.email
    );

    // Return the registered user if exists
    if (registeredUser) {
      return registeredUser;
    }

    // Create an instance of the User model
    const newUser = new User({
      email: googleUser.email,
      name: googleUser.name,
      phone,
      verified: {
        email: true,
        phone: false,
      },
      authType: "google",
      role,
      lastLogin: new Date(),
    });

    // Save the user to the DB
    await newUser.save();

    return newUser;
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
    if (authType === "email") {
      // Login with email/phone and password
      return await loginWithEmailOrPhone(emailOrPhone, password);
    } else {
      // Login with google token
      return await loginWithGoogle(googleToken);
    }
  } catch (err) {
    throw err;
  }
};

const loginWithEmailOrPhone = async (emailOrPhone, password) => {
  try {
    // Check if user exists
    const user = await usersService.findUserByEmailOrPhone(emailOrPhone);
    if (!user) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.auth.incorrectCredentials;
      throw new ApiError(statusCode, message);
    }

    // Check if password is incorrect
    if (!(await user.comparePassword(password))) {
      const statusCode = httpStatus.UNAUTHORIZED;
      const message = errors.auth.incorrectCredentials;
      throw new ApiError(statusCode, message);
    }

    // Update user's last login date
    user.updateLastLogin();

    // Save the user to the DB
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
