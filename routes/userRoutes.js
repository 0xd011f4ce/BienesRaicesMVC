import express from "express";
import {
  formForgotPassword,
  formLogin,
  formSignup,
  registerUser,
} from "../controllers/userController.js";

const router = express.Router();

// routing
router.get("/login", formLogin);

router.get("/signup", formSignup);
router.post("/signup", registerUser);

router.get("/forgot-password", formForgotPassword);

export default router;
