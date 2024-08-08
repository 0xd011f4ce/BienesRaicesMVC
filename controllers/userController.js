const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Log In",
  });
};

const formSignup = (req, res) => {
  res.render("auth/signup", {
    page: "Sign Up",
  });
};

const formForgotPassword = (req, res) => {
  res.render("auth/forgot-password", {
    page: "Forgot Password",
  });
};

export { formLogin, formSignup, formForgotPassword };
