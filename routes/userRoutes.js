import express from "express";
import {
  formForgotPassword,
  formLogin,
  formSignup,
  registerUser,
  confirmAccount,
} from "../controllers/userController.js";

const router = express.Router();

// routing
router.get("/login", formLogin);

router.get("/signup", formSignup);
router.post("/signup", registerUser);

router.get("/confirm/:token", confirmAccount);

router.get("/forgot-password", formForgotPassword);

export default router;
