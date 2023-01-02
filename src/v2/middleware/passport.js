const { User } = require("../models/user/user.model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { server } = require("../config/system");

const jwtOptions = {
  secretOrKey: process.env["JWT_PRIVATE_KEY"],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    // Check if user exists
    const user = await User.findById(payload.sub);

    // Check if password is correct
    const tokenPassword = payload.password.substring(0, user.password.length);

    // Check if password salt is correct
    const tokenPasswordSalt = payload.password.substring(user.password.length);

    // Check if auth-token is authorized
    const unauthorized =
      !user ||
      tokenPassword !== user.password ||
      tokenPasswordSalt !== server.PASSWORD_SALT ||
      payload.email !== user.email ||
      payload.phone !== user.phone.full;

    return unauthorized ? done(null, false) : done(null, user);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
