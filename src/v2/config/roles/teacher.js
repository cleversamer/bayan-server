module.exports = Object.freeze({
  user: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  emailVerificationCode: {
    "read:own": ["*"],
    "update:own": ["*"],
  },
  password: {
    "update:own": ["*"],
  },
  level: {
    "read:any": ["*"],
  },
  grade: {
    "read:any": ["*"],
  },
  season: {
    "read:any": ["*"],
  },
  subject: {
    "read:any": ["*"],
  },
  unit: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  lesson: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  document: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  video: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  quiz: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  question: {
    "read:any": ["*"],
    "create:any": ["*"],
    "update:own": ["*"],
  },
  package: {
    "read:any": ["*"],
  },
});
