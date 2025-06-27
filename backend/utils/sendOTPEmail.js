import nodemailer from "nodemailer";

export const sendOTPEmail = async (toEmail, otp) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or use smtp.ethereal.email for testing
      auth: {
        user: process.env.EMAIL_USER,     // Your email (e.g., Gmail)
        pass: process.env.EMAIL_PASSWORD, // Your email password or App password
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
export default sendOTPEmail