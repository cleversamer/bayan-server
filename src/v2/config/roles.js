const AccessControl = require("accesscontrol");

const allRights = {
  "create:any": ["*"],
  "read:any": ["*"],
  "update:any": ["*"],
  "delete:any": ["*"],
};

let grantsObject = {
  student: {
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
    },
    lesson: {
      "read:any": ["*"],
    },
    document: {
      "read:own": ["*"],
    },
    video: {
      "read:own": ["*"],
    },
    quiz: {
      "read:own": ["*"],
    },
    question: {
      "read:own": ["*"],
    },
    package: {
      "read:any": ["*"],
    },
    subscription: {
      "read:own": ["*"],
      "create:own": ["*"],
    },
  },
  teacher: {
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
  },
  admin: {
    user: allRights,
    emailVerificationCode: allRights,
    password: allRights,
    level: allRights,
    grade: allRights,
    season: allRights,
    subject: allRights,
    freeSubject: allRights,
    unit: allRights,
    lesson: allRights,
    document: allRights,
    video: allRights,
    quiz: allRights,
    question: allRights,
    package: allRights,
    subscription: allRights,
  },
};

const roles = new AccessControl(grantsObject);

module.exports = roles;
