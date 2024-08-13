import { validationResult } from "express-validator";

import { Category, Price, Property } from "../models/index.js";

const admin = (req, res) => {
  res.render("properties/admin", {
    page: "My Properties",
    header: true,
  });
};

// form to create a new property
const propertyCreate = async (req, res) => {
  // consult model and price models
  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);

  res.render("properties/create", {
    page: "Create Property",
    header: true,
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: {},
  });
};

// save a new property
const propertySave = async (req, res) => {
  // validation result
  let result = validationResult(req);

  if (!result.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);

    return res.render("properties/create", {
      page: "Create Property",
      header: true,
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body,
    });
  }

  // create a new property
  const {
    title,
    description,
    rooms,
    garages,
    wc,
    street,
    lat,
    lng,
    price: priceId,
    category: categoryId,
  } = req.body;

  const { id: userId } = req.user;

  try {
    const propertySaved = await Property.create({
      title,
      description,
      rooms,
      garages,
      wc,
      street,
      lat,
      lng,
      priceId,
      categoryId,
      userId,
      image: "",
    });

    const { id } = propertySaved;

    res.redirect(`/properties/add-image/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export { admin, propertyCreate, propertySave };
