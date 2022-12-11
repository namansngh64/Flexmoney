const { validationResult } = require("express-validator");
const UserPayment = require("../models/userPayment");

exports.completePayment = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array()[0] });
  }
  const { age } = req.body;
  if (age < 18 || age > 65) {
    return res.json({ error: { msg: "Only for 18-65 age group!" } });
  }
  const paymentId = Math.floor(100000 + Math.random() * 900000); //Suppose this is payment ID
  req.body.paymentId = paymentId;
  const user = new UserPayment(req.body);
  user.save((err, user) => {
    if (err) return res.json({ error: "Something went wrong!" });
    //send email with paymentId and all details
    return res.json(user._id);
  });
};
