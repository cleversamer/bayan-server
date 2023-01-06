module.exports = {
  name: { minLength: 8, maxLength: 64 },
  email: { minLength: 5, maxLength: 256 },
  phone: {
    nsn: { minLength: 4, maxLength: 13 },
  },
  // First role in this array === default role
  roles: ["student", "teacher", "admin"],
  // First auth type in this array === default auth type
  authTypes: ["email", "google"],
  password: { minLength: 8, maxLength: 64 },
  verificationCode: { exactLength: 4 },
  receiverTypes: ["email", "phone"],
};
