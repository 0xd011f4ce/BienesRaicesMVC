import { check, validationResult } from "express-validator";

import User from "../models/user.js";
import { generateId } from "../helpers/tokens.js";
import { emailSignUp } from "../helpers/emails.js";

const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Log In",
  });
};

const formSignup = (req, res) => {
  res.render("auth/signup", {
    page: "Sign Up",
    csrfToken: req.csrfToken(),
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
      csrfToken: req.csrfToken(),
    });
  }

  // verify user is not duplicated
  const exists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (exists) {
    return res.render("auth/signup", {
      page: "Sign Up",
      errors: [
        {
          msg: "Email is already in use",
        },
      ],
      user: {
        username: req.body.username,
        email: req.body.email,
      },
      csrfToken: req.csrfToken(),
    });
  }

  // store user
  const { username, email, password } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    token: generateId(),
  });

  // send confirmation email
  emailSignUp({
    name: user.username,
    email: user.email,
    token: user.token,
  });

  // show confirmation message
  res.render("templates/message.pug", {
    page: "Account created successfully",
    message: "We've sent a confirmation email to verify your account",
  });
};

const confirmAccount = async (req, res) => {
  const { token } = req.params;

  // verify if token is valid
  const user = await User.findOne({
    where: {
      token,
    },
  });

  if (!user) {
    return res.render("auth/confirm-account", {
      page: "Confirm Account",
      error: true,
      message: "Invalid token",
    });
  }

  // confirm account
  user.token = null;
  user.confirmed = true;
  await user.save();

  return res.render("auth/confirm-account", {
    page: "Confirm Account",
    message: "Account has been confirmed, you can log in now!",
  });
};

const formForgotPassword = (req, res) => {
  res.render("auth/forgot-password", {
    page: "Forgot Password",
  });
};

export {
  formLogin,
  formSignup,
  registerUser,
  confirmAccount,
  formForgotPassword,
};
