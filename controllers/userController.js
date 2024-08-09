import { check, validationResult } from "express-validator";

import User from "../models/user.js";

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

const registerUser = async (req, res) => {
  // validation
  await check("username")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .run(req);
  await check("password2")
    .equals("password")
    .withMessage("Password confirmation does not match")
    .run(req);

  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("auth/signup", {
      page: "Sign Up",
      errors: result.array(),
      user: {
        username: req.body.username,
        email: req.body.email,
      },
    });
  }

  const user = await User.create(req.body);
  res.json(user);
};

const formForgotPassword = (req, res) => {
  res.render("auth/forgot-password", {
    page: "Forgot Password",
  });
};

export { formLogin, formSignup, registerUser, formForgotPassword };
