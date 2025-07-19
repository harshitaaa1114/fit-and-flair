
import express from "express";
import { forgotPassword, loginUser, myProfile, register, resetPassword, verifyUser,verifyEmailWithToken,googleSignInAction, resendotp} from "../controller/user.controller.js";
import { getUserRecommendedDresses } from "../controller/dress.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.get("/me", isAuth, myProfile);
router.post("/forgot", forgotPassword);
router.post("/reset",resetPassword);
router.post("/google-signin",googleSignInAction);
router.post("/verify-token",verifyEmailWithToken);
router.post("/resendotp",resendotp)
router.post("/get-dresses-by-fields", getUserRecommendedDresses);

export default router;

