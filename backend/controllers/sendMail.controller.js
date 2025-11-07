// controllers/mail.controller.js
import { sendMailFromUser } from "../utils/mailer.js";
import { Mail } from "../models/mail.model.js";

export const sendMail = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const mail = await Mail.create({ subject, message });

    await sendMailFromUser(subject, message, `<p>${message}</p>`);
    return res.status(201).json({
      message: "Mail sent successfully",
      mail,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
