import express from "express";
import { formLogin } from "../controllers/userController.js";

const router = express.Router();

// routing
router.get("/login", formLogin);

export default router;
