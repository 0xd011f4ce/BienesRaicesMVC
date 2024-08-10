const admin = (req, res) => {
  res.render("properties/admin", {
    page: "My Properties",
    header: true,
  });
};

// form to create a new property
const propertyCreate = (req, res) => {
  res.render("properties/create", {
    page: "Create Property",
    header: true,
  });
};

export { admin, propertyCreate };
