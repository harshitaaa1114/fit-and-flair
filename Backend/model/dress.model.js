import mongoose from "mongoose";
import { Category } from "./category.model.js"; // Make sure this path is correct

const validHeightRanges = ["short", "average", "tall"];
const validGenders = ["male", "female"];
const validBodyShapes = {
  male: ["rectangle", "triangle", "inverted triangle", "oval", "trapezoid", "diamond"],
  female: ["pear", "apple", "hourglass", "rectangle", "inverted triangle", "diamond"]
};

const dressSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
    enum: validGenders,
    lowercase: true
  },

  bodyShape: {
    type: String,
    required: true,
    lowercase: true, // convert input to lowercase
    // ❌ Removed faulty validator using `this.gender`
    // ✅ Controller will handle this check
  },

  heightRange: {
    type: String,
    required: true,
    enum: validHeightRanges,
    lowercase: true
  },

  category: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: async function (value) {
        // ✅ Match case-insensitively
        const exists = await Category.findOne({ categoryName: new RegExp(`^${value}$`, "i") });
        return !!exists;
      },
      message: "Category does not exist"
    }
  },

  dresses: [
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png)$/i.test(v)
            || /\.(jpg|jpeg|png)$/i.test(v);
        },
        message: "Only JPG/PNG URLs are allowed"
      }
    }
  }
]

});

export const Dress = mongoose.model("Dress", dressSchema);

// Export enums for controller/frontend
export const DressEnums = {
  heightRanges: validHeightRanges,
  bodyShapes: validBodyShapes,
  genders: validGenders
};
