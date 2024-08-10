import jwt from "jsonwebtoken";

const generateJWT = (data) => {
  return jwt.sign(
    {
      id: data.id,
      name: data.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const generateId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);

export { generateId, generateJWT };
