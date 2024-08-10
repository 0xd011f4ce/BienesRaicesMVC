import nodemailer from "nodemailer";

const emailSignUp = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  // send email
  await transport.sendMail({
    from: "demomailtrap.com",
    to: email,
    subject: "Confirm your account",
    text: "Confirm your account",
    html: `
      <h1>Confirm your account</h1>
      <p>Hello ${name}, click the following link to confirm your account</p>
      <a href="${process.env.HOST}/auth/confirm/${token}">Confirm your account</a> `,
  });
};

const emailForgotPass = async (data) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  // send email
  await transport.sendMail({
    from: "demomailtrap.com",
    to: email,
    subject: "Reset your password",
    text: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Hello ${name}, click the following link to reset your password</p>
      <a href="${process.env.HOST}/auth/forgot-password/${token}">Reset your password</a>`,
  });
};

export { emailSignUp, emailForgotPass };
