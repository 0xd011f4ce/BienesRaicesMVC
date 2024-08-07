import express from "express";

const router = express.Router();

// routing
router.get("/login", function (req, res) {
  res.render("auth/login", {
    authenticated: true,
  });
});

export default router;
