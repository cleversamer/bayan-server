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
    worksheet.columns = [
      { header: "ID", key: "_id" },
      { header: "الإسم الكامل", key: "fullname" },
      { header: "البريد الإلكتروني", key: "email" },
      { header: "رقم الهاتف", key: "phone" },
      { header: "نوع المستخدم", key: "role" },
      { header: "مفعّل البريد", key: "emailVerified" },
      { header: "مفعّل الهاتف", key: "phoneVerified" },
      { header: "منضمّ بواسطة", key: "joinedBy" },
      { header: "أخر دخول", key: "lastLogin" },
    ];

    // Add row for each user in the Database
    users.forEach(function (user) {
      worksheet.addRow({
        _id: user._id,
        fullname: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.verified.email,
        phoneVerified: user.verified.phone,
        joinedBy: user.authType,
        lastLogin: user.lastLogin,
      });
    });

    // Decide excel's file
    const currentDate = new Date().toLocaleString();
    const fileName = `ملف_مستخدمين_بيان_${currentDate}`;
    const filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`${fileName}.xlsx`);

    // Return file's path
    return filePath;
  } catch (err) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = errors.system.errorExportingExcel;
    throw new ApiError(statusCode, message);
  }
};
