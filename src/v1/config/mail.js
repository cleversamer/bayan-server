const auth = {
  user: "taxilenapp@gmail.com",
  password: process.env["EMAIL_PRIVATE_KEY"],
  emailURL: "http://192.168.1.235:4000/",
  siteDomains: {
    verifyEmail: "http://192.168.1.235:4000/api/users/verify-email/",
  },
};

module.exports = {
  auth,
};
