

import nodemailer from "nodemailer";

export const sendOTPEmail = async (toEmail, otp, subject = "Your OTP Code") => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"TaskApp" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2 style="color: #333;">🔐 Your OTP Code</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h3 style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${otp}</h3>
          <p>This code will expire in <b>5 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to", toEmail);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

export default sendOTPEmail;



