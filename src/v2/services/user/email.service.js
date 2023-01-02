const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { mail } = require("../../config/system");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: mail.auth.user,
    pass: mail.auth.password,
  },
});

module.exports.registerEmail = async (email, user) => {
  try {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "منصة بيان التعليمية",
        link: "#",
        copyright: "حقوق النسخ © 2022 منصة بيان التعليمية. حميع الحقوق محفوظة.",
      },
    });

    const emailBody = mailGenerator.generate({
      body: {
        title: `<br />
        <center text-align="right">
          هذا هو الكود الخاص بتفعيل بريدك الإلكتروني صالح لمدة 10 دقائق:
          <br /> 
          ${user.emailVerificationCode.code}
          </center>
         <br />`,
        greeting: "Dear",
        signature: user.name || "مستخدم منصة بيان",
      },
    });

    const message = {
      to: email,
      from: "منصة بيان التعليمية",
      html: emailBody,
      subject: "أهلاً بك في منصة بيان التعليمية",
    };

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    throw err;
  }
};

module.exports.forgotPasswordEmail = async (lang, email, user) => {
  try {
    if (!["ar", "en"].includes(lang)) {
      lang = "ar";
    }

    const {
      subject,
      emailBody: { title, greeting },
    } = mail.types.forgotPassword;

    const mailGenerator = mail.getMailGenerator(lang);

    const emailBody = mail.getEmailBody(
      mailGenerator,
      title[lang](user),
      greeting[lang],
      user
    );

    const message = mail.getMessage(email, emailBody, subject[lang]);

    await transporter.sendMail(message);
    return true;
  } catch (err) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = errors.system.emailError;
    throw new ApiError(statusCode, message);
  }
};
