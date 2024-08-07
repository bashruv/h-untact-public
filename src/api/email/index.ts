import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "iCloud",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail(
  to: string,
  subject: string,
  emailTemplate: string,
) {
  try {
    const info = await transporter.sendMail({
      from: `"H.Untact Info Center" <${process.env.MAIL_SENDER}>`,
      to,
      subject,
      html: emailTemplate,
    });

    if (info.messageId) return true;
    else return false;
  } catch {
    return false;
  }
}
