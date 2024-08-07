import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// enable pug
app.set("view engine", "pug");
app.set("views", "./views");

// routing
app.use("/auth", userRoutes);

// define port and start project
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
