const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      length: 40
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    slot: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: String,
      required: true,
      trim: true
    },
    paymentId: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserPayment", userSchema);
