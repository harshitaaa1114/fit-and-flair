
import { Dress, DressEnums } from "../model/dress.model.js";
import { Category } from "../model/category.model.js";
import mongoose from "mongoose";
export const createOrUpdateDress = async (req, res) => {
  const { title, description, gender, bodyShape, heightRange, category } = req.body;
  const file = req.file;

  console.log("REQ FILE:", file);
  console.log("REQ BODY:", req.body);

  
  if (!file || !title || !description || !gender || !bodyShape || !heightRange || !category) {
    return res.status(400).json({ message: "All fields including image file are required" });
  }

  
  const genderLC = gender.toLowerCase();
  const bodyShapeLC = bodyShape.toLowerCase();
  const heightLC = heightRange.toLowerCase();
  const categoryLC = category.toLowerCase();

  
  if (!DressEnums.genders.includes(genderLC)) {
    return res.status(400).json({ message: "Invalid gender" });
  }

  
  if (!DressEnums.bodyShapes[genderLC].includes(bodyShapeLC)) {
    return res.status(400).json({
      message: `Invalid body shape '${bodyShape}' for selected gender '${gender}'`,
    });
  }

  
  if (!DressEnums.heightRanges.includes(heightLC)) {
    return res.status(400).json({ message: `Invalid height range '${heightRange}'` });
  }

  
  const categoryExists = await Category.findOne({ categoryName: new RegExp(`^${category}$`, "i") });
  if (!categoryExists) {
    return res.status(400).json({ message: `Category '${category}' does not exist` });
  }

  try {
     const image = file.path.replace(/\\/g, "/");
    

    let existing = await Dress.findOne({
      gender: genderLC,
      bodyShape: bodyShapeLC,
      heightRange: heightLC,
      category: categoryLC,
    });

    const newDressEntry = {
      title,
      description,
      image,
    };

    if (existing) {
      const duplicate = existing.dresses.find(
        (d) => d.title.toLowerCase() === title.toLowerCase()
      );
      if (duplicate) {
        return res.status(409).json({ message: `Dress with title "${title}" already exists.` });
      }

      existing.dresses.push(newDressEntry);
      await existing.save();
      return res.status(200).json({ message: "Dress updated", data: existing });
    }

    const newDress = await Dress.create({
      gender: genderLC,
      bodyShape: bodyShapeLC,
      heightRange: heightLC,
      category: categoryLC,
      dresses: [newDressEntry],
    });

    return res.status(201).json({ message: "Dress created", data: newDress });
  } catch (error) {
    return res.status(500).json({
      message: "Error processing request",
      error: error.message,
    });
  }
};



  
export const getDresses = async (req, res) => {
  const { gender, bodyShape, heightRange, category } = req.query;

  try {
    const query = {};
    if (gender) query.gender = gender;
    if (bodyShape) query.bodyShape = bodyShape;
    if (heightRange) query.heightRange = heightRange;
    if (category) query.category = category;

    const dresses = await Dress.find(query);
    if (!dresses.length) {
      return res.status(404).json({ message: "No dresses found for this criteria." });
    }

    res.status(200).json({ dresses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dresses", error: error.message });
  }
};


export const getDressById = async (req, res) => {
  try {
    const dressId = req.params.id;
    console.log("Fetching dress with ID:", dressId);

    const group = await Dress.findOne({ "dresses._id": dressId });
    console.log("Group found:", group);

    if (!group) {
      console.error("Dress group not found");
      return res.status(404).json({ message: "Dress not found in any group." });
    }

    const dress = group.dresses.find((d) => d._id.toString() === dressId);
    console.log("Dress found in group:", dress);

    if (!dress) {
      console.error("Dress not found in group");
      return res.status(404).json({ message: "Dress not found." });
    }

    res.status(200).json({
      dress: {
        ...dress.toObject(),  
        gender: group.gender,
        bodyShape: group.bodyShape,
        heightRange: group.heightRange,
        category: group.category,
      },
    });
  } catch (error) {
    console.error("Error in getDressById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteDressById = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

   
    const group = await Dress.findOne({ "dresses._id": id });

    if (!group) {
   
      return res.status(404).json({ message: "Dress not found" });
    }

    const updated = await Dress.updateOne(
      { _id: group._id },
      { $pull: { dresses: { _id: id } } }
    );

    if (updated.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to delete dress" });
    }

    res.status(200).json({ message: "Dress deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({
      message: "Error deleting dress",
      error: error.message,
    });
  }
};
  
  export const deleteAllDresses = async (req, res) => {
    try {
      await Dress.deleteMany({});
      res.status(200).json({ message: "All dresses deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting all dresses", error: error.message });
    }
  };

  export const deleteGroupByFields = async (req, res) => {
  const { gender, category, bodyShape, heightRange } = req.body;

  try {
    const deleted = await Dress.deleteMany({
      gender,
      category,
      bodyShape,
      heightRange,
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted", count: deleted.deletedCount });
  } catch (error) {
    console.error("Delete Group Error:", error.message);
    res.status(500).json({ message: "Failed to delete group", error: error.message });
  }
};

  
  
  export const updateDressById = async (req, res) => {
  try {
    const dressId = req.params.id;

    const group = await Dress.findOne({ "dresses._id": dressId });

    if (!group) {
      return res.status(404).json({ message: "Dress group not found" });
    }

    const dress = group.dresses.id(dressId); // Get the subdocument by ID
    if (!dress) {
      return res.status(404).json({ message: "Dress not found" });
    }

    dress.title = req.body.title;
    dress.description = req.body.description;
    console.log("deress path",req.file);
    if (req.file) {
      dress.image = req.file.path;
    }

    await group.save();

    res.status(200).json({ message: "Dress updated successfully", dress });
  } catch (error) {
    console.error("❌ Error updating dress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  export const deleteDressByTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "Title is required in body" });
    }
  
    try {
      const dressDoc = await Dress.findById(id);
  
      if (!dressDoc) {
        return res.status(404).json({ message: "Dress document not found" });
      }
  
      const initialLength = dressDoc.dresses.length;
  
      dressDoc.dresses = dressDoc.dresses.filter(d => d.title !== title);
  
      if (dressDoc.dresses.length === initialLength) {
        return res.status(404).json({ message: "Dress title not found" });
      }
  
      await dressDoc.save();
      res.status(200).json({ message: "Dress removed successfully", data: dressDoc });
    } catch (error) {
      res.status(500).json({ message: "Error deleting dress", error: error.message });
    }
  };
  

  export const updateDressByTitle = async (req, res) => {
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
  
    try {
      const dressDoc = await Dress.findById(id);
      if (!dressDoc) {
        return res.status(404).json({ message: "Dress document not found" });
      }
  
      const dress = dressDoc.dresses.find(d => d.title === title);
      if (!dress) {
        return res.status(404).json({ message: "Dress with title not found" });
      }
  
  
      if (description) dress.description = description;
      if (imageUrl) dress.imageUrl = imageUrl;
  
      await dressDoc.save();
      res.status(200).json({ message: "Dress updated", data: dressDoc });
    } catch (error) {
      res.status(500).json({ message: "Error updating dress", error: error.message });
    }
  };
  

  export const getDressByTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ message: "Title is required in body" });
    }
  
    try {
      const dressDoc = await Dress.findById(id);
      if (!dressDoc) {
        return res.status(404).json({ message: "Dress document not found" });
      }
  
      const dress = dressDoc.dresses.find(d => d.title === title);
      if (!dress) {
        return res.status(404).json({ message: "Dress with title not found" });
      }
  
      res.status(200).json({ message: "Dress found", data: dress });
    } catch (error) {
      res.status(500).json({ message: "Error fetching dress", error: error.message });
    }
  };

export const getUserRecommendedDresses = async (req, res) => {
  const { gender, bodyShape, heightRange, category } = req.body;

  if (!gender || !bodyShape || !heightRange || !category) {
    return res.status(400).json({ message: "All parameters are required" });
  }

  try {
    const match = await Dress.findOne({ gender, bodyShape, heightRange, category });

    if (!match || match.dresses.length === 0) {
      return res.status(404).json({ message: "No matching dresses found" });
    }

    return res.status(200).json({ dresses: match.dresses });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
