import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendMailFromUser( subject, text, html) {
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Shourya" <${process.env.EMAIL}>`,
      to: process.env.TO_EMAIL,
      subject,
      text,
      html,
    });

    console.log(`Email sent`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}
