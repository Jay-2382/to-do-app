import nodemailer from "nodemailer";

export const sendOTPEmail = async (toEmail, otp) => {
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
      subject: "Your OTP Code for Registration",
      html: `<p>Your OTP code is: <b>${otp}</b></p><p>It expires in 5 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("OTP email sent to", toEmail);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};
