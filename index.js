import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from "./config/db.js";

const app = express();

// db connection
try {
  await db.authenticate();
  db.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.log(error);
}

// enable form data
app.use(express.urlencoded({ extended: true }));

// enable pug
app.set("view engine", "pug");
app.set("views", "./views");

// public folder
app.use(express.static("public"));

// routing
app.use("/auth", userRoutes);

// define port and start project
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
