var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(
  subject: string,
  toEmail: string,
  otpText: string
): Promise<boolean> {
  const transporter = nodemailer.createTransport({
    host: "smtp.beget.com",
    port: 2525,

    /* 
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: "info@fluttrium.ru",
      pass: "CN*3m1fGt1dw",
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL!,
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
}
