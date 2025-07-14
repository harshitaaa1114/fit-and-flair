import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goal: { type: String, required: true },
  description: { type: String, required: true },
  images: [{
    type: String,
    validate: {
      validator: function (v) {
        return /\.(jpg|jpeg|png)$/i.test(v);
      },
      message: 'Only JPG and PNG images are allowed'
    }
  }]
});

const howToStyleSchema = new mongoose.Schema({
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"], 
  },
  category: { type: String, required: true }, 
  goals: [goalSchema]
});

export const HowToStyle = mongoose.model("HowToStyle", howToStyleSchema);
