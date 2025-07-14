


import express from "express";
import {
  createOrUpdateDress,
  getDresses,
  deleteDressById,
  deleteAllDresses,
  updateDressById,
  deleteGroupByFields,
  updateDressByTitle,
  getDressByTitle,
  getDressById,
  
  
  
  
} from "../controller/dress.controller.js";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteAllCategories,
  deleteCategory
} from "../controller/category.controller.js";

import {
  createOrUpdateStyle,
  getAllStyles,
  getStyleById,
  deleteGoalFromCategory,
  updateGoal,
  deleteAllStyles,
  updateCategoryInfo,
  getStylesByCategory,
  getStylesByGender
} from "../controller/howtostyle.controller.js";

import { loginAdmin } from "../controller/user.controller.js";
import { DressEnums } from "../model/dress.model.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

console.log("🔥 Admin Router file loaded");

router.post("/login", loginAdmin);
router.get("/test", (req, res) => {
  res.send("Admin route working");
});

// Dress Routes
router.post("/create/dress", upload.single("image"), createOrUpdateDress);
router.get("/get/dresses", getDresses);
router.delete("/delete/dress/:id", deleteDressById);
router.delete("/delete/dresses", deleteAllDresses);
router.put("/update/dress/:id", upload.single("image"), updateDressById);// router.delete("/delete/dress/:title", deleteDressByTitle);
router.put("/update/dress/:title", updateDressByTitle);
router.post("/get/dress/:title", getDressByTitle);
router.get("/get/dress/:id", getDressById);
router.post("/delete/group", deleteGroupByFields);





// Category Routes
router.post("/create/category", createCategory);
router.get("/get/categories", getAllCategories);
router.get("/get/category/:id", getCategoryById);
router.delete("/delete/category/:id", deleteCategory);
router.delete("/delete/categories", deleteAllCategories);

// Enums
router.get("/get/heightranges", (req, res) => {
  res.json({ heightRanges: DressEnums.heightRanges });
});

router.get("/get/bodyshapes/:gender", (req, res) => {
  const gender = req.params.gender?.toLowerCase();
  const bodyShapes = DressEnums.bodyShapes[gender];
  if (!bodyShapes) return res.status(400).json({ message: "Invalid gender" });
  res.json({ bodyShapes });
});

// How to Style Routes
router.post("/style/create", createOrUpdateStyle);
router.get("/style/get-all/:gender", getAllStyles);
router.get("/style/get/:id", getStyleById);
router.delete("/style/delete-goal/:category", deleteGoalFromCategory);
router.put("/style/update-goal/:id", updateGoal);
router.delete("/style/delete-all/:gender", deleteAllStyles);
router.put("/style/update/:id", updateCategoryInfo);
router.get("/style/get-by-category/:category", getStylesByCategory);
router.get("/style/get-by-gender/:gender", getStylesByGender);

export default router;
