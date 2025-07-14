import BodyShape from "../model/shape.model.js";
import mongoose from 'mongoose';


const calculateShapeBackend = ({ shoulder, chest, waist, hip, height, gender }) => {
  const allowedUnits = ["cm", "inches"];
  const measurements = { shoulder, chest, waist, hip };

  for (const key in measurements) {
    const unit = measurements[key].unit;
    if (!allowedUnits.includes(unit)) {
      throw new Error(`${key} unit '${unit}' is invalid. Use only 'cm' or 'inches'.`);
    }
  }

  const allowedHeightUnits = ["cm", "inches", "feet"];
  if (!allowedHeightUnits.includes(height.unit)) {
    throw new Error(`Height unit '${height.unit}' is invalid. Use only 'cm', 'inches', or 'feet'.`);
  }
const convertToCm = (value, unitType) => {
  if (unitType === "inches") {
    return parseFloat(value) * 2.54;
  }

  if (unitType === "feet") {
    if (typeof value === "string" && value.includes("'")) {
      // Handle format like 5'10"
      const [feetStr, inchStr] = value.replace(/"/g, "").split("'");
      const feet = parseInt(feetStr);
      const inches = parseInt(inchStr || "0");
      return (feet * 30.48) + (inches * 2.54);
    } else if (typeof value === "string" && value.includes(".")) {
      // Handle 5.10 as 5 feet 10 inches
      const [feetStr, inchStr] = value.split(".");
      const feet = parseInt(feetStr);
      const inches = parseInt(inchStr || "0");
      return (feet * 30.48) + (inches * 2.54);
    } else {
      // Handle just feet (e.g., "6")
      return parseFloat(value) * 30.48;
    }
  }

  return parseFloat(value); // cm
};

 


  const s = convertToCm(shoulder.value, shoulder.unit);
  const c = convertToCm(chest.value, chest.unit);
  const w = convertToCm(waist.value, waist.unit);
  const h = convertToCm(hip.value, hip.unit);
  const heightInCm = convertToCm(height.value, height.unit);

  let shape = "", recommendation = "", heightCategory = "";

  if (heightInCm < 155) heightCategory = "Short";
  else if (heightInCm <= 170) heightCategory = "Average";
  else heightCategory = "Tall";

  
  if (gender === "female") {
    console.log("Converted values:", { s, c, w, h });
  console.log("Condition results (female):", {
    pear: Math.abs(h - s) >= 1 && h > s && h > c,
    hourglass: Math.abs(c - h) <= 2 && c > w,
    rectangle: Math.abs(c - w) <= 2 && Math.abs(w - h) <= 2,
    apple: c > h && c > s
  });
    if (Math.abs(h - s) >= 1 && h > s && h > c) {
  shape = "Pear";
  recommendation = "A-line skirts, boat neck tops, and embellished tops.";
} else if (Math.abs(c - h) <= 2 && c > w) {
  shape = "Hourglass";
  recommendation = "Wrap dresses, high-waisted pants, and fitted tops.";
} else if (Math.abs(c - w) <= 2 && Math.abs(w - h) <= 2) {
  shape = "Rectangle";
  recommendation = "Peplum tops, layered looks, and belted dresses.";
} else if (c > h && c > s && Math.abs(w - c) <= 3) {
  shape = "Apple";
  recommendation = "Empire waist tops, V-necklines, and flowy dresses.";
} else if (w > c && w > h && s < w && c < w) {
  shape = "Diamond";
  recommendation = "Structured jackets, dark tops, and straight pants.";
} else {
  shape = "Inverted Triangle";
  recommendation = "Wide-leg pants, V-necks, and flared skirts.";
}

  }
   else if (gender === "male") {
  if (
    Math.abs(s - c) <= 3 &&
    Math.abs(c - w) <= 3 &&
    Math.abs(w - h) <= 3
  ) {
    shape = "Rectangle";
    recommendation =
      "Use layering (jackets, cardigans), structured blazers, and avoid tight fits.";
  } else if (
    h >= c + 5 &&  // hips > chest
    c >= s + 2     // chest > shoulders
  ) {
    shape = "Triangle";
    recommendation =
      "Bright upperwear, structured shoulders, and darker trousers.";
  } else if (
    s >= c + 5 &&  // shoulders > chest
    c > w
  ) {
    shape = "Inverted Triangle";
    recommendation =
      "Straight pants, minimal upper layering, and round neck t-shirts.";
  } else if (
    w >= c + 5 &&
    w >= s + 5
  ) {
    shape = "Oval";
    recommendation =
      "Vertical stripes, single-breasted blazers, and avoid skinny jeans.";
  } else if (
    w > c &&
    w > h &&
    s < w
  ) {
    shape = "Diamond";
    recommendation =
      "Structured blazers, dark tops, and straight pants.";
  } else {
    shape = "Trapezoid";
    recommendation =
      "Fitted shirts, tucked-in polos, and slim-fit pants.";
  }
}


  if (heightCategory === 'Short') {
    recommendation += ' Avoid oversized clothing and go for fitted outfits.';
  } else if (heightCategory === 'Medium') {
    recommendation += ' Try cropped jackets, casual shirts, and chinos.';
  } else {
    recommendation += ' Long coats, cuffed jeans, and layer-friendly outfits.';
  }

  return { shape, heightCategory, recommendation };
};

export const calculateShape = async (req, res) => {
  try {
    const { shoulder, chest, waist, hip, height, gender } = req.body;

    const { shape, heightCategory, recommendation } = calculateShapeBackend({
      shoulder, chest, waist, hip, height, gender
    });

    const created = await BodyShape.create({
      shape,
      heightCategory,
      recommendation,
      gender,
      shoulder,
      chest,
      waist,
      hip,
      height
    });

    
    return res.status(200).json({
      id: created._id,
      gender,
      height: `${height.value} ${height.unit}`,  // ✅ THIS LINE IS ADDED
      heightCategory,
      bodyShape: shape,
      recommendation
    });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};


export const getBodyShapeByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const shape = await BodyShape.findById(id);
    if (!shape) {
      return res.status(404).json({ message: "Body shape not found." });
    }

    return res.status(200).json(shape);
  } catch (error) {
    console.error("Get Shape Error:", error.message);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getAllBodyShapes = async (req, res) => {
  try {
    const allShapes = await BodyShape.find({});
    
    return res.status(200).json({
      success: true,
      count: allShapes.length,
      data: allShapes
    });
  } catch (err) {
    console.error("Error fetching all shapes:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};



export const updateBodyShapeByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const existingData = await BodyShape.findById(id);
    if (!existingData) {
      return res.status(404).json({ message: "No data found with this ID." });
    }

    const newData = {
      shoulder: req.body.shoulder || existingData.shoulder,
      chest: req.body.chest || existingData.chest,
      waist: req.body.waist || existingData.waist,
      hip: req.body.hip || existingData.hip,
      height: req.body.height || existingData.height,
      gender: req.body.gender || existingData.gender
    };

    const { shape, heightCategory, recommendation } = calculateShapeBackend(newData);

    const hasChanged =
      shape !== existingData.shape ||
      heightCategory !== existingData.heightCategory ||
      recommendation !== existingData.recommendation ||
      JSON.stringify(newData.shoulder) !== JSON.stringify(existingData.shoulder) ||
      JSON.stringify(newData.chest) !== JSON.stringify(existingData.chest) ||
      JSON.stringify(newData.waist) !== JSON.stringify(existingData.waist) ||
      JSON.stringify(newData.hip) !== JSON.stringify(existingData.hip) ||
      JSON.stringify(newData.height) !== JSON.stringify(existingData.height);

    if (!hasChanged) {
      return res.status(200).json({
        success: false,
        message: "No changes detected."
      });
    }

    const updated = await BodyShape.findByIdAndUpdate(id, {
      ...newData,
      shape,
      heightCategory,
      recommendation
    }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updated
    });

  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const deleteBodyShapeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const deleted = await BodyShape.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "No data found with this ID." });
    }

    return res.status(200).json({
      success: true,
      message: "Body shape data deleted successfully."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteAllBodyShapes = async (req, res) => {
  try {
    await BodyShape.deleteMany({});
    return res.status(200).json({ message: "All body shape data deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

