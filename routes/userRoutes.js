import express from "express";
import {
  formForgotPassword,
  formLogin,
  authenticate,
  formSignup,
  registerUser,
  confirmAccount,
  resetPassword,
  checkToken,
  newPassword,
} from "../controllers/userController.js";

const router = express.Router();

// routing
router.get("/login", formLogin);
router.post("/login", authenticate);

router.get("/signup", formSignup);
router.post("/signup", registerUser);

router.get("/confirm/:token", confirmAccount);

router.get("/forgot-password", formForgotPassword);
router.post("/forgot-password", resetPassword);

router.get("/forgot-password/:token", checkToken);
router.post("/forgot-password/:token", newPassword);

export default router;
