const { clientSchema } = require("../../models/user/subscription.model");
const { subscriptionsService } = require("../../services");
const httpStatus = require("http-status");
const { ApiError } = require("../../middleware/apiError");
const errors = require("../../config/errors");
const _ = require("lodash");

module.exports.createSubscription = async (req, res, next) => {
  try {
    const user = req.user;
    const { packageId, subjects } = req.body;

    const subscription = await subscriptionsService.subscribeToPackage(
      user,
      packageId,
      subjects
    );

    res.status(httpStatus.CREATED).json(subscription);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserSubscriptions = async (req, res, next) => {
  try {
    const user = req.user;
    let subscriptions = await subscriptionsService.getUserSubscriptions(
      user._id,
      false
    );

    if (!subscriptions || !subscriptions.length) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.subscription.noSubscriptions;
      throw new ApiError(statusCode, message);
    }

    res.status(httpStatus.OK).json(subscriptions);
  } catch (err) {
    next(err);
  }
};

module.exports.toggleSubscriptionActive = async (req, res, next) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await subscriptionsService.toggleSubscriptionActive(
      subscriptionId
    );

    res.status(httpStatus.CREATED).json(_.pick(subscription, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.toggleSubjectActive = async (req, res, next) => {
  try {
    const { subscriptionId, subjectId } = req.body;

    const subscription = await subscriptionsService.toggleSubjectActive(
      subscriptionId,
      subjectId
    );

    res.status(httpStatus.CREATED).json(_.pick(subscription, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.addSubjectToSubscription = async (req, res, next) => {
  try {
    const { subscriptionId, subjectId } = req.body;

    const subscription = await subscriptionsService.addSubjectToSubscription(
      subscriptionId,
      subjectId
    );

    res.status(httpStatus.CREATED).json(_.pick(subscription, clientSchema));
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSubscribedSubject = async (req, res, next) => {
  try {
    const { subscriptionId, subjectId } = req.body;

    const subscription = await subscriptionsService.deleteSubscribedSubject(
      subscriptionId,
      subjectId
    );

    res.status(httpStatus.CREATED).json(_.pick(subscription, clientSchema));
  } catch (err) {
    next(err);
  }
};
