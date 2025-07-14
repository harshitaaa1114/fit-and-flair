

import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  unit: { type: String, enum: ['cm', 'inches'], required: true }
}, { _id: false });

const heightSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  unit: { type: String, enum: ['cm', 'inches', 'feet'], required: true }
}, { _id: false });

const bodyShapeSchema = new mongoose.Schema({
  shape: { type: String, required: true },
  heightCategory: { type: String, required: true },
  recommendation: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },

  shoulder: measurementSchema,
  chest: measurementSchema,
  waist: measurementSchema,
  hip: measurementSchema,
  height: heightSchema,
}, {
  timestamps: true
});

export default mongoose.model("BodyShape", bodyShapeSchema);
