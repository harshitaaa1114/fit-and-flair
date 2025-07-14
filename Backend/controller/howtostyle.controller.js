import { HowToStyle } from "../model/howtostyle.model.js";


export const createOrUpdateStyle = async (req, res) => {
  const { gender, category, goals } = req.body;

  if (!gender || !category || !goals || !Array.isArray(goals)) {
    return res.status(400).json({ message: "Gender, category, and goals are required" });
  }

  try {
    const existing = await HowToStyle.findOne({ gender, category });
    if (existing) {
      existing.goals.push(...goals);
      await existing.save();
      return res.status(200).json({ message: "Goals added to existing category", data: existing });
    }

    const newEntry = await HowToStyle.create({ gender, category, goals });
    res.status(201).json({ message: "New category created", data: newEntry });
  } catch (error) {
    res.status(500).json({ message: "Error creating style data", error: error.message });
  }
};


export const getAllStyles = async (req, res) => {
  const { gender } = req.params; 

  try {
    const styles = await HowToStyle.find({ gender });
    res.status(200).json(styles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};


export const getStyleById = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await HowToStyle.findById(id);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error: error.message });
  }
};

export const getStylesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
  
    const data = await HowToStyle.find({ category });
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No styles found for this category" });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching styles", error: error.message });
  }
};


export const getStylesByGender = async (req, res) => {
  const { gender } = req.params; 

  try {
  
    const data = await HowToStyle.find({ gender });
    
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No styles found for this gender" });
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching styles", error: error.message });
  }
};



export const deleteGoalFromCategory = async (req, res) => {
  const { id } = req.params; // Category ID
  const { goal } = req.body;

  try {
    const data = await HowToStyle.findById(id);
    if (!data) return res.status(404).json({ message: "Category not found" });

    data.goals = data.goals.filter(g => g.goal !== goal);
    await data.save();

    res.status(200).json({ message: "Goal deleted successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Error deleting goal", error: error.message });
  }
};

export const updateGoal = async (req, res) => {
    const { id } = req.params; 
    const { goal, newGoal, newDescription, newImages } = req.body;
  
    try {
      const category = await HowToStyle.findById(id);
      if (!category) return res.status(404).json({ message: "Category not found" });
  
      const goalItem = category.goals.find(g => g.goal === goal);
      if (!goalItem) return res.status(404).json({ message: "Goal not found in this category" });
  
      
      if (newGoal !== undefined && newGoal !== goal) goalItem.goal = newGoal; // Update goal
      if (newDescription !== undefined) goalItem.description = newDescription; // Update description
      if (newImages !== undefined && Array.isArray(newImages)) goalItem.images = newImages; // Update images
  
      await category.save();
  
      res.status(200).json({ message: "Goal updated successfully", data: category });
    } catch (error) {
      res.status(500).json({ message: "Error updating goal", error: error.message });
    }
  };
  


export const deleteAllStyles = async (req, res) => {
  const { gender } = req.params;

  try {
    await HowToStyle.deleteMany({ gender });
    res.status(200).json({ message: "All categories deleted for " + gender });
  } catch (error) {
    res.status(500).json({ message: "Error deleting all categories", error: error.message });
  }
};

export const updateCategoryInfo = async (req, res) => {
  const { id } = req.params;
  const { newGender, newCategory, newGoals } = req.body;

  try {
    const category = await HowToStyle.findById(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    
    if (newGender !== undefined) {
      if (!["male", "female"].includes(newGender)) {
        return res.status(400).json({ message: "Invalid gender" });
      }
      category.gender = newGender;  
    }

    if (newCategory !== undefined) {
      category.category = newCategory; 
    }

    if (newGoals !== undefined) {
      
      category.goals = newGoals;
    }

    await category.save();  

    res.status(200).json({ message: "Category info updated", data: category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error: error.message });
  }
};

