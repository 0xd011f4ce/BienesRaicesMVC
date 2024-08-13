import bcrypt from "bcrypt";

const users = [
  {
    username: "John",
    email: "john@doe.com",
    confirmed: true,
    password: bcrypt.hashSync("password", 10),
  },
];

export default users;
