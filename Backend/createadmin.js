
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { userdetail } from "./model/user.model.js"; 

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const adminExists = await userdetail.findOne({ email: "admin@gmail.com" });
  if (adminExists) {
    console.log("Admin already exists ");
    return process.exit();
  }

  await userdetail.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    isVerified: true
  });

  console.log(" Admin created");
  process.exit();
};

run();
