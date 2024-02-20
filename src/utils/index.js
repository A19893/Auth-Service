const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require('path')
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
});

exports.get_html_template_creation_test = function ({
    user_name,
    verify_url,
  }) {
    return ejs.renderFile(
      path.join(path.dirname(__dirname), "templates", "emailVerification.ejs"),
      { user_name, verify_url }
    );
};

exports.send_email = async function ({ from, to, subject, html }) {
        if (!from) throw new custom_error("Sender email must be present");
        if (!to) throw new custom_error("Receiver email must be present");
        if (!subject) throw new custom_error("Email subject must be present");
        if (!html) throw new custom_error(" html must be present");
      
        // eslint-disable-next-line snakecasejs/snakecasejs
        await transporter.sendMail({
          from,
          to,
          subject,
          html,
        });
};