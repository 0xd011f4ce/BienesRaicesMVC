import Price from "../models/price.js";
import Category from "../models/category.js";

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
    categories,
    prices,
  });
};

export { admin, propertyCreate };
