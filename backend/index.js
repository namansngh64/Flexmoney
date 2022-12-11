const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const paymentRoute = require("./routes/payment");

//middlewares
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://0.0.0.0:27017/flexmoney", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

//server running
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
//api
app.use("/api", paymentRoute);
