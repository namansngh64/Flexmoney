const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { completePayment } = require("../controllers/payment");

router.post(
  "/makePayment",
  body("email", "Enter Valid Email").isEmail(),
  body("name", "Enter Valid Name").isLength({ min: "3" }),
  body("age", "Enter Valid Age").isNumeric(),
  body("slot", "Select slot").isLength({ min: "5" }),
  completePayment
);

module.exports = router;
