import { unlink } from "node:fs/promises";
import { validationResult } from "express-validator";

import { Category, Price, Property } from "../models/index.js";

const admin = async (req, res) => {
  const { id } = req.user;
  const properties = await Property.findAll({
    where: {
      userId: id,
    },
    include: [
      {
        model: Category,
        as: "category",
      },
      {
        model: Price,
        as: "price",
      },
    ],
  });

  res.render("properties/admin", {
    page: "My Properties",
    properties,
    csrfToken: req.csrfToken(),
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
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/my-properties");
  }

  res.render("properties/add-image", {
    page: `Add Image: ${property.title}`,
    csrfToken: req.csrfToken(),
    property,
  });
};

const storeImage = async (req, res) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);
  if (!property) {
    return res.redirect("/my-properties");
  }

  if (property.published) {
    return res.redirect("/my-properties");
  }

  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/my-properties");
  }

  try {
    // store the image and publish property
    property.image = req.file.filename; // file is added by multer
    property.published = true;

    await property.save();

    res.redirect("/my-properties");
  } catch (err) {
    console.log(err);
  }
};

const propertyEdit = async (req, res) => {
  const { id } = req.params;

  // validate property exists
  const property = await Property.findByPk(id);
  if (!property) {
    return res.redirect("/my-properties");
  }

  // check who visits the url is the owner
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/my-properties");
  }

  const [categories, prices] = await Promise.all([
    Category.findAll(),
    Price.findAll(),
  ]);

  res.render("properties/edit", {
    page: `Edit Property: ${property.title}`,
    csrfToken: req.csrfToken(),
    categories,
    prices,
    data: property,
  });
};

const propertySaveChanges = async (req, res) => {
  // Verify the validation
  let result = validationResult(req);

  if (!result.isEmpty()) {
    const [categories, prices] = await Promise.all([
      Category.findAll(),
      Price.findAll(),
    ]);

    return res.render("properties/edit", {
      page: "Edit Property",
      csrfToken: req.csrfToken(),
      categories,
      prices,
      errors: result.array(),
      data: req.body,
    });
  }

  const { id } = req.params;

  // validate property exists
  const property = await Property.findByPk(id);
  if (!property) {
    return res.redirect("/my-properties");
  }

  // check who visits the url is the owner
  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/my-properties");
  }

  // save the changes
  try {
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

    property.set({
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
    });

    await property.save();
    res.redirect("/my-properties");
  } catch (err) {
    console.log(err);
  }
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;

  const property = await Property.findByPk(id);

  if (!property) {
    return res.redirect("/my-properties");
  }

  if (property.userId.toString() !== req.user.id.toString()) {
    return res.redirect("/my-properties");
  }

  // delete the image
  await unlink(`public/uploads/${property.image}`);

  // delete the property
  await property.destroy();
  res.redirect("/my-properties");
};

export {
  admin,
  propertyCreate,
  propertySave,
  propertyAddImage,
  storeImage,
  propertyEdit,
  propertySaveChanges,
  deleteProperty,
};
