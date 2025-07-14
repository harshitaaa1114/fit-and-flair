
import express from "express";
import { forgotPassword, loginUser, myProfile, register, resetPassword, verifyUser,verifyEmailWithToken,googleSignInAction, resendotp} from "../controller/user.controller.js";
import { getUserRecommendedDresses } from "../controller/dress.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

// Register route (OTP will be sent to email)
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


// http://localhost:3000/user/verify
// {
//     "otp":223919,
//     "activationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJKb2huIERvZSIsImVtYWlsIjoic2FjaGluc2FpbmkwODg4M0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRSUTcvNWRPd3hZRk1Rb3VYUEtSUTBla0ZhWXhXWTkvWG8wazdQY3A5cEYwL1Rray5lUk1BRyJ9LCJvdHAiOjIyMzkxOSwiaWF0IjoxNzQ5MjcyOTI2LCJleHAiOjE3NDkyNzMyMjZ9.nSTgmY6mGhCLRpCSAgTvUELiS9mf-9k6b7nB_JSJaHQ"
// }
//http://localhost:3000/user/login
// {
//     "email":"sachinsaini08883@gmail.com",
//     "password":"123456"
// }
// {
//     "message": " Welcome back John Doe",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODQzYzk5NTliYTZhZTk5YTNmMmYzMjYiLCJpYXQiOjE3NDkyNzMxNDYsImV4cCI6MTc1MDU2OTE0Nn0.0pdNYsOoscYMwlu59D_HamrYBGDYujRgUVLLnXUDqd8",
//     "user": {
//         "_id": "6843c9959ba6ae99a3f2f326",
//         "email": "sachinsaini08883@gmail.com",
//         "name": "John Doe",
//         "password": "$2b$10$RQ7/5dOwxYFMQouXPKRQ0ekFaYxWY9/Xo0k7Pcp9pF0/Tkk.eRMAG",
//         "isVerified": false,
//         "lastLogin": "2025-06-07T05:09:41.469Z",
//         "createdAt": "2025-06-07T05:09:41.474Z",
//         "updatedAt": "2025-06-07T05:09:41.474Z",
//         "__v": 0
//     }
// }
// http://localhost:3000/user/forgot
// {
//     "email":"sachinsaini08883@gmail.com"
   
// }