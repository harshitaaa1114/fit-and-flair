import express from "express";
import { calculateShape ,getBodyShapeByUserId,updateBodyShapeByUserId,deleteBodyShapeById,getAllBodyShapes,deleteAllBodyShapes} from "../controller/shape.controller.js";


const router = express.Router();

router.post("/body-shapes", calculateShape);
router.get("/body-shape/:id", getBodyShapeByUserId);
router.get('/body-shapes', getAllBodyShapes);
router.put('/body-shape/:id', updateBodyShapeByUserId);
router.delete('/body-shape/:id', deleteBodyShapeById);
router.delete('/body-shapes', deleteAllBodyShapes);



export default router;