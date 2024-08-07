const formLogin = (req, res) => {
  res.render("auth/login", {
    authenticated: true,
  });
};

export { formLogin };
