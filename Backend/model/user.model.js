
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordOtp: Number,
  resetPasswordExpire: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date
}, { timestamps: true });


export const userdetail = mongoose.model('User', userSchema);
