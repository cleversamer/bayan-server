const mongoose = require("mongoose");
const { Package } = require("../../models/tutorial/package.model");
const gradesService = require("../school/sections/grades.service");
const { ApiError } = require("../../middleware/apiError");
const httpStatus = require("http-status");
const errors = require("../../config/errors");

module.exports.findPakcageById = async (packageId) => {
  try {
    return await Package.findById(packageId);
  } catch (err) {
    throw err;
  }
};

module.exports.getMappedPackage = async (packageId) => {
  try {
    const result = await Package.aggregate([
      { $match: { _id: packageId } },
      {
        $lookup: {
          from: "grades",
          localField: "gradeId",
          foreignField: "_id",
          as: "grade",
        },
      },
      {
        $project: {
          _id: 1,
          author: 1,
          price: 1,
          months: 1,
          subjects: 1,
          grade: {
            _id: 1,
            photoURL: 1,
            number: 1,
          },
        },
      },
    ]);

    return result[0];
  } catch (err) {
    throw err;
  }
};

module.exports.createPackage = async (
  user,
  gradeId,
  numOfSubjects,
  price,
  months
) => {
  try {
    const grade = await gradesService.findGradeById(gradeId);
    if (!grade) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.grade.notFound;
      throw new ApiError(statusCode, message);
    }

    // TODO: Check if at least one season of this grade contains `numOfSubjects`

    const gradePackages = await this.getGradePackages(grade._id);

    const package = new Package({
      author: user._id,
      levelId: grade.levelId,
      gradeId: grade._id,
      months,
      price,
      numOfSubjects,
    });

    const packageAlreadyAdded = gradePackages.find((p) => {
      const monthsEqual = p.months === months;
      const priceEqual = p.price === price;
      const numOfSubjectsEqual = p.numOfSubjects === numOfSubjects;
      return monthsEqual && priceEqual && numOfSubjectsEqual;
    });

    if (packageAlreadyAdded) {
      const statusCode = httpStatus.NOT_FOUND;
      const message = errors.package.alreadyAdded;
      throw new ApiError(statusCode, message);
    }

    return await package.save();
  } catch (err) {
    throw err;
  }
};

module.exports.getGradePackages = async (gradeId) => {
  try {
    return await Package.aggregate([
      { $match: { gradeId: new mongoose.Types.ObjectId(gradeId) } },
      {
        $lookup: {
          from: "grades",
          localField: "gradeId",
          foreignField: "_id",
          as: "grade",
        },
      },
      {
        $project: {
          _id: 1,
          photoURL: 1,
          price: 1,
          months: 1,
          numOfSubjects: 1,
          author: {
            _id: 1,
            name: 1,
          },
          grade: {
            _id: 1,
            number: 1,
          },
        },
      },
    ]);
  } catch (err) {
    throw err;
  }
};
