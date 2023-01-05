const Excel = require("exceljs");
const httpStatus = require("http-status");
const errors = require("../../config/errors");
const { ApiError } = require("../../middleware/apiError");

module.exports.exportUsersToExcelFile = async (users = []) => {
  try {
    // Create a new Excel Workbook
    let workbook = new Excel.Workbook();
    // Add new sheet to the Workbook
    let worksheet = workbook.addWorksheet("مستخدمين تطبيق بيان");

    // Specify excel sheet's columns
    worksheet.addRow([
      "ID",
      "الإسم الكامل",
      "البريد الإلكتروني",
      "رقم الهاتف",
      "نوع المستخدم",
      "مفعّل البريد",
      "مفعّل الهاتف",
      "منضمّ بواسطة",
      "أخر دخول",
    ]);

    // Add row for each user in the Database
    users.forEach(function (user) {
      worksheet.addRow([
        user._id,
        user.name,
        user.email,
        user.phone.full,
        user.role,
        user.verified.email,
        user.verified.phone,
        user.authType,
        user.lastLogin,
      ]);
    }, "i");

    // Decide excel's file
    const fileName = filterName(`bayan_users_${getCurrentDate()}`) + ".xlsx";
    const filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Return file's path
    return filePath;
  } catch (err) {
    console.log("err", err.message);
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = errors.system.errorExportingExcel;
    throw new ApiError(statusCode, message);
  }
};

const filterName = (name = "") => {
  return name.split(" ").join("_").split(":").join("_");
};

const getCurrentDate = () => {
  let strDate = new Date().toLocaleString();
  strDate = strDate.split(", ");
  let part1 = strDate[0];

  let date = `${part1}`;
  date = date.split("/").join("-");
  return date;
};
