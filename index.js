import express from "express";

const app = express();

// routing
app.get("/", function (req, res) {
  res.send("Hello World");
});

// define port and start project
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
