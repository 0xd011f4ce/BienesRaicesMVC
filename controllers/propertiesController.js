import { validationResult } from "express-validator";

import { Category, Price, Property } from "../models/index.js";

const admin = (req, res) => {
  res.render("properties/admin", {
    page: "My Properties",
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

const propertyAddImage = async (req, res) => {
  // validate the property exists
  const { id } = req.params;

  const property = await Property.findByPk(id);
  if (!property) {
    return res.redirect("/my-properties");
  }

  // validate the property is unpublished
  if (property.published) {
    return res.redirect("/my-properties");
  }

  // validate the property belongs to the user
  if (property.userId !== req.user.id) {
    return res.redirect("/my-properties");
  }

  res.render("properties/add-image", {
    page: "Add Image",
  });
};

export { admin, propertyCreate, propertySave, propertyAddImage };
