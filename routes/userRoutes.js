import express from "express";
import {
  formForgotPassword,
  formLogin,
  formSignup,
  registerUser,
  confirmAccount,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// routing
router.get("/login", formLogin);

router.get("/signup", formSignup);
router.post("/signup", registerUser);

router.get("/confirm/:token", confirmAccount);

router.get("/forgot-password", formForgotPassword);
router.post("/forgot-password", resetPassword);

export default router;
