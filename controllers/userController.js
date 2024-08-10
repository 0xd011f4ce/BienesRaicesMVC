import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

import User from "../models/user.js";
import { generateId } from "../helpers/tokens.js";
import { emailSignUp, emailForgotPass } from "../helpers/emails.js";

const formLogin = (req, res) => {
  res.render("auth/login", {
    page: "Log In",
    csrfToken: req.csrfToken(),
  });
};

const authenticate = async (req, res) => {
  // validation
  await check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .run(req);

  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("auth/login", {
      page: "Log In",
      csrfToken: req.csrfToken(),
      errors: result.array(),
    });
  }

  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return res.render("auth/login", {
      page: "Log In",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "Invalid email or password" }],
    });
  }

  // check if user is confirmed
  if (!user.confirmed) {
    return res.render("auth/login", {
      page: "Log In",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "Please confirm your account" }],
    });
  }

  // check if password is correct
  if (!user.verifyPassword(password)) {
    return res.render("auth/login", {
      page: "Log In",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "Incorrect password" }],
    });
  }

  // authenticate user
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
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  // validation
  await check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .run(req);

  let result = validationResult(req);

  if (!result.isEmpty()) {
    return res.render("auth/forgot-password", {
      page: "Forgot Password",
      csrfToken: req.csrfToken(),
      errors: result.array(),
    });
  }

  // look for user
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.render("auth/forgot-password", {
      page: "Forgot Password",
      csrfToken: req.csrfToken(),
      errors: [{ msg: "User not found" }],
    });
  }

  // generate new token and send email address
  user.token = generateId();
  await user.save();

  // send email
  emailForgotPass({
    name: user.username,
    email: user.email,
    token: user.token,
  });

  // render message
  res.render("templates/message", {
    page: "Forgot Password",
    message: "We've sent an email to reset your password",
  });
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    where: {
      token,
    },
  });

  if (!user) {
    return res.render("auth/confirm-account", {
      page: "Reset Password",
      error: true,
      message: "Invalid token",
    });
  }

  // display form to modify password
  res.render("auth/reset-password", {
    page: "Reset Password",
    csrfToken: req.csrfToken(),
  });
};

const newPassword = async (req, res) => {
  // validate password
  await check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters.")
    .run(req);
  await check("password2")
    .equals("password")
    .withMessage("Password confirmation does not match.")
    .run(req);

  let result = validationResult(req);
  if (!result.isEmpty()) {
    return res.render("auth/reset-password", {
      page: "Reset Password",
      csrfToken: req.csrfToken(),
      errors: result.array(),
    });
  }

  const { token } = req.params;
  const { password } = req.body;

  // check who the user is
  const user = await User.findOne({
    where: {
      token,
    },
  });

  // hash password and store it in the database
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.token = null;
  await user.save();

  res.render("auth/confirm-account", {
    page: "Reset Password",
    message: "Password has been updated, you can log in now!",
  });
};

export {
  formLogin,
  authenticate,
  formSignup,
  registerUser,
  confirmAccount,
  formForgotPassword,
  resetPassword,
  checkToken,
  newPassword,
};
