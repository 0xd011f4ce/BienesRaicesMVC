import express from "express";
import { body } from "express-validator";

import {
  admin,
  propertyCreate,
  propertySave,
} from "./../controllers/propertiesController.js";

const router = express.Router();

router.get("/my-properties", admin);
router.get("/properties/create", propertyCreate);
router.post(
  "/properties/create",
  body("title").notEmpty().withMessage("Ad Title is mandatory"),
  body("description")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Description cannot be longer than 255 characters"),
  body("category").isNumeric().withMessage("Category is mandatory"),
  body("price").isNumeric().withMessage("Price is mandatory"),
  body("rooms").isNumeric().withMessage("Rooms is mandatory"),
  body("garages").isNumeric().withMessage("Garages is mandatory"),
  body("wc").isNumeric().withMessage("WC is mandatory"),
  body("lat").notEmpty().withMessage("Locate property on the map"),
  propertySave
);

export default router;
