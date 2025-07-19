import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

import UserRouter from "./route/user.route.js";
import shapeRouter from "./route/shape.route.js";
import contactRouter from "./route/contact.route.js";
import adminRouter from "./route/admin.route.js";

dotenv.config();
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: ["https://fit-and-flair-frontend.onrender.com"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", UserRouter);
app.use("/admin", adminRouter);
app.use(express.json());
app.use("/body", shapeRouter);
app.use("/form", contactRouter);

mongoose.connect(process.env.MONGO_ATLAS_URL)
.then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("Database connection failed:", err);
});

console.log("its running")