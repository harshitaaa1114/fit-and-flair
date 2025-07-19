
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEamil = async (to, code) => {
  const mailOptions = {
    from: `"MyApp Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email - MyApp",
    html: `
      <h2>Email Verification</h2>
      <p>Your verification code is:</p>
      <h3>${code}</h3>
      <p>This code will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendWelcomeEmail = async (to, name) => {
  const mailOptions = {
    from: `"MyApp Team" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Welcome to MyApp!",
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Your email has been successfully verified. 🎉</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
