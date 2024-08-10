const admin = (req, res) => {
  res.render("properties/admin", {
    page: "My Properties",
    header: true,
  });
};

export { admin };
