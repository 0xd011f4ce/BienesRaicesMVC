import express from "express";
import { body } from "express-validator";

import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/uploadImage.js";

import {
  admin,
  propertyCreate,
  propertySave,
  propertyAddImage,
  storeImage,
  propertyEdit,
  propertySaveChanges,
  deleteProperty,
  showProperty,
} from "./../controllers/propertiesController.js";

const router = express.Router();

router.get("/my-properties", protectRoute, admin);

router.get("/properties/create", protectRoute, propertyCreate);
router.post(
  "/properties/create",
  protectRoute,
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

router.get("/properties/add-image/:id", protectRoute, propertyAddImage);

router.post(
  "/properties/add-image/:id",
  protectRoute,
  upload.single("image"),
  storeImage
);

router.get("/properties/edit/:id", protectRoute, propertyEdit);
router.post(
  "/properties/edit/:id",
  protectRoute,
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
  propertySaveChanges
);

router.post("/properties/delete/:id", protectRoute, deleteProperty);

// public
router.get("/property/:id", showProperty);

export default router;
