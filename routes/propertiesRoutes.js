import express from "express";

import {
  admin,
  propertyCreate,
} from "./../controllers/propertiesController.js";

const router = express.Router();

router.get("/my-properties", admin);
router.get("/properties/create", propertyCreate);

export default router;
