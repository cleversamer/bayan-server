const mongoose = require("mongoose");
const httpStatus = require("http-status");
const {
  Subscription,
} = require("../../models/subscription/subscription.model");
const packagesService = require("../subscription/packages.service");
const subjectsService = require("../school/sections/subjects.service");
const errors = require("../../config/errors");
const { ApiError } = require("../../middleware/apiError");

module.exports.findSubscriptionById = async (subscriptionId) => {
  try {
    return await Subscription.findById(subscriptionId);
  } catch (err) {
    throw err;
  }
};

module.exports.checkIfSubjectSubscribed = async (user, subjectId) => {
  try {
    const userSubcriptions = await this.getUserSubscriptions(user, false);

    for (let subscription of userSubcriptions) {
      for (let subject of subscription.subjects) {
        if (subject.ref.toString() === subjectId.toString()) {
          if (!subscription.active) {
            const statusCode = httpStatus.FORBIDDEN;
            const message = errors.subscription.notActive;
            throw new ApiError(statusCode, message);
          }

          if (!subject.active) {
            const statusCode = httpStatus.FORBIDDEN;
            const message = errors.subscription.subjectNotActive;
            throw new ApiError(statusCode, message);
          }

          return true;
        }
      }
    }

    return false;
  } catch (err) {
    throw err;
  }
};

module.exports.toggleSubscriptionActive = async (subscriptionId) => {
  try {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.notFound;
      throw new ApiError(statusCode, message);
    }

    subscription.active = !subscription.active;
    return await subscription.save();
  } catch (err) {
    throw err;
  }
};

module.exports.toggleSubjectActive = async (subscriptionId, subjectId) => {
  try {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.notFound;
      throw new ApiError(statusCode, message);
    }

    const subjectIndex = subscription.subjects.findIndex(
      (subject) => subject.ref.toString() === subjectId
    );
    if (subjectIndex === -1) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.subjectNotFound;
      throw new ApiError(statusCode, message);
    }

    subscription.subjects[subjectIndex].active =
      !subscription.subjects[subjectIndex].active;

    await subscription.save();

    return subscription.subjects[subjectIndex];
  } catch (err) {
    throw err;
  }
};

module.exports.addSubjectToSubscription = async (subscriptionId, subjectId) => {
  try {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.notFound;
      throw new ApiError(statusCode, message);
    }

    const subjectIndex = subscription.subjects.findIndex(
      (subject) => subject.toString() === subjectId
    );
    if (subjectIndex !== -1) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.subjectAlreadyAdded;
      throw new ApiError(statusCode, message);
    }

    const subject = await subjectsService.findSubjectById(subjectId);
    if (!subject) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subject.notFound;
      throw new ApiError(statusCode, message);
    }

    const package = await packagesService.findPakcageById(
      subscription.packageId
    );
    if (!package) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.package.notFound;
      throw new ApiError(statusCode, message);
    }

    if (package.gradeId.toString() !== subject.gradeId.toString()) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.subjectSelectedNotAllowed;
      throw new ApiError(statusCode, message);
    }

    if (subscription.subjects.length >= package.numOfSubjects) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.maximumSubjectsReached;
      throw new ApiError(statusCode, message);
    }

    const mappedSubject = { ref: subject._id, active: true };
    subscription.subjects.push(mappedSubject);

    return await subscription.save();
  } catch (err) {
    throw err;
  }
};

module.exports.deleteSubscribedSubject = async (subscriptionId, subjectId) => {
  try {
    const subscription = await this.findSubscriptionById(subscriptionId);
    if (!subscription) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.notFound;
      throw new ApiError(statusCode, message);
    }

    const subjectIndex = subscription.subjects.findIndex(
      (subject) => subject.ref.toString() === subjectId
    );
    if (subjectIndex === -1) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.subjectNotFound;
      throw new ApiError(statusCode, message);
    }

    subscription.subjects = subscription.subjects.filter(
      (item) => item.ref.toString() !== subjectId
    );

    return await subscription.save();
  } catch (err) {
    throw err;
  }
};

module.exports.subscribeToPackage = async (
  user,
  packageId,
  subjects,
  paymentInfo
) => {
  try {
    const package = await packagesService.findPakcageById(packageId);

    if (!package) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.package.notFound;
      throw new ApiError(statusCode, message);
    }

    const uniqueArray =
      subjects.filter((item, index) => {
        return subjects.indexOf(item) == index;
      }).length === subjects.length;

    if (!uniqueArray) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.subjectsNotEqual;
      throw new ApiError(statusCode, message);
    }

    const mappedSubjects = await subjectsService.findSubjectsByIds(subjects);
    if (subjects.length !== mappedSubjects.length) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.notAllFound;
      throw new ApiError(statusCode, message);
    }

    for (let subject of mappedSubjects) {
      if (subject.gradeId.toString() !== package.gradeId.toString()) {
        const statusCode = httpStatus.BAD_REQUEST;
        const message = errors.subscription.subjectsSelectedNotAllowed;
        throw new ApiError(statusCode, message);
      }
    }

    const userSubjects = [];
    let userSubcriptions = await this.getUserSubscriptions(user);
    userSubcriptions = userSubcriptions.forEach((u) => {
      const expired = new Date() >= new Date(u.expiresAt);

      if (!expired) {
        userSubjects.push(...u.subjects.map((s) => s._id.toString()));
      }
    });

    const oneSelectedSubjectExist = userSubjects.find((s) =>
      subjects.includes(s)
    );

    if (oneSelectedSubjectExist) {
      const statusCode = httpStatus.BAD_REQUEST;
      const message = errors.subscription.subjectsSelectedExist;
      throw new ApiError(statusCode, message);
    }

    // Pay with crosspay card

    const subscriptionSubjects = subjects.map((subject) => ({
      ref: subject,
      active: true,
    }));

    const subscription = new Subscription({
      userId: user._id,
      packageId,
      gradeId: package.gradeId,
      subjects: subscriptionSubjects,
    });

    await subscription.save();

    return user;
  } catch (err) {
    throw err;
  }
};

module.exports.getUserSubscriptions = async (userId, mapSubjects = true) => {
  try {
    const pipeline = [
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "packages",
          localField: "packageId",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $lookup: {
          from: "grades",
          localField: "gradeId",
          foreignField: "_id",
          as: "grade",
        },
      },
    ];

    if (mapSubjects) {
      pipeline.push({
        $lookup: {
          from: "subjects",
          localField: "subjects.ref",
          foreignField: "_id",
          as: "subjectsList",
        },
      });
    }

    const subscriptions = await Subscription.aggregate(pipeline);

    return subscriptions;
  } catch (err) {
    throw err;
  }
};
