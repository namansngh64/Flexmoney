const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const paymentRoute = require("./routes/payment");

//middlewares
app.use(
  cors({ credentials: true, origin: "https://flexmoneyfront.onrender.com" })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.8vmlpld.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
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
