import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // .env file ke values ko load karega

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,      // from .env
  api_key: process.env.CLOUD_API_KEY,      // from .env
  api_secret: process.env.CLOUD_API_SECRET // from .env
});

// Cloudinary ke liye multer storage define kar rahe
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",                      // images Cloudinary me is folder me jayengi
    allowed_formats: ["jpg", "png", "jpeg"] // allowed formats
  }
});

export { cloudinary, storage };
