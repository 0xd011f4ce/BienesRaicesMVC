import express from "express";

const router = express.Router();

// routing
router.get("/", function (req, res) {
  res.json({ msg: "Hello World" });
});

export default router;
