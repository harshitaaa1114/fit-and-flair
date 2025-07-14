


import { userdetail } from "../model/user.model.js"; // direct import without aliasing
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotMail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/TryCatch.js";

// ✅ REGISTER with OTP
export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;

  let existingUser = await userdetail.findOne({ email }); // userdetail used here
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashPassword };

  const otp = Math.floor(100000 + Math.random() * 900000);

  const activationToken = jwt.sign(
    { user: newUser, otp },
    process.env.Activation_Secret,
    { expiresIn: "5m" }
  );

  const data = { name, otp };
  await sendMail(email, "Fit & Flair - OTP Verification", data);

  res.status(200).json({
    message: "OTP sent to your email",
    activationToken,
  });
});

// ✅ VERIFY Email with OTP
export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);
  if (!verify) return res.status(400).json({ message: "OTP expired" });

  if (verify.otp !== Number(otp)) {
    return res.status(400).json({ message: "Wrong OTP" });
  }

  await userdetail.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({ message: "User Registered" });
});



export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await userdetail.findOne({ email });
  if (!user) return res.status(400).json({ message: "No user with this email" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) return res.status(400).json({ message: "Wrong Password" });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, { expiresIn: "15d" });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});


// ✅ MY PROFILE
export const myProfile = TryCatch(async (req, res) => {
  const user = await userdetail.findById(req.user._id).select("-password");
  res.status(200).json({ user });
});


// ✅ FORGOT PASSWORD - send OTP
export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await userdetail.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user with this email" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.resetPasswordOtp = otp;
  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendForgotMail("Fit & Flair Password Reset OTP", { email, otp });
  res.json({ message: "OTP has been sent to your email." });
});

// ✅ RESET PASSWORD
export const resetPassword = TryCatch(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await userdetail.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user with this email" });

  if (!user.resetPasswordExpire || user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  if (user.resetPasswordOtp !== Number(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordOtp = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.json({ message: "Password has been reset successfully." });
});

// ✅ FORGOT PASSWORD - Resend OTP
export const resendotp = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await userdetail.findOne({ email });
  if (!user) return res.status(404).json({ message: "No user with this email" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.resetPasswordOtp = otp;
  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  await user.save();

  await sendForgotMail("Fit & Flair Password Reset OTP", { email, otp });
  res.json({ message: "OTP has been resent to your email." });
});

// ✅ VERIFY EMAIL BY TOKEN
export const verifyEmailWithToken = TryCatch(async (req, res) => {
  const { token } = req.params;
  const user = await userdetail.findOne({ verificationToken: token });

  if (!user) return res.status(400).json({ error: "Invalid token" });

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.redirect("https://fit-and-flair-frontend.onrender.com/sign-in");
});

// // ✅ GOOGLE SIGN-IN
// export const googleSignInAction = TryCatch(async (req, res) => {
//   const { email, name } = req.body;

//   let user = await userdetail.findOne({ email });

//   if (!user) {
//     user = new userdetail({
//       name,
//       email,
//       role: "user",
//       isVerified: true,
//       googleSignIn: true,
//       password: "",
//     });
//     await user.save({ validateBeforeSave: false });
//   }

//   req.session.userId = user._id;
//   user.password = undefined;

//   res.status(200).json({ message: "Google Sign-in Success", user });
// });

export const googleSignInAction = TryCatch(async (req, res) => {
  const { email, name } = req.body;
  let user = await userdetail.findOne({ email });

  if (!user) {
    user = new userdetail({
      name,
      email,
      role: "user",
      isVerified: true,
      googleSignIn: true,
      password: "",
    });
    await user.save({ validateBeforeSave: false });
  }

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, { expiresIn: "15d" });

  res.status(200).json({
    message: "Google Sign-in Success",
    token,
    user,
  });
});


export const loginAdmin = TryCatch(async (req, res) => {
    console.log("Hit /admin/login route");

  const { email, password } = req.body;
  console.log("Received email:", email);

  // Check for fixed admin email
  if (email !== "admin@gmail.com") {
    
    return res.status(403).json({ message: "Access denied" });
  }

  const admin = await userdetail.findOne({ email });
    console.log("Admin not found");
  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  console.log("Incorrect password");
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign({ _id: admin._id }, process.env.Jwt_Sec, { expiresIn: "15d" });
console.log("JWT generated");
  res.status(200).json({
    message: `Welcome  ${admin.name}`,
    token,
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});
