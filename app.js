const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// for ejs engine
const ejs = require("ejs");
app.set("view engine", "ejs");
const errorHandler = require("./Middleware/errorHandler");

// middleware
app.use(cors());
app.use(express.json());
// to get ejs files data
app.use(express.urlencoded({ extended: false }));
// to serve upload folders (images)
app.use(express.static("./upload"));  

// import all routes
const usersRoutes = require("./Routes/v1/users.routes");
const forgotPasswordRoutes = require("./Routes/v1/forgotPassword.routes");
const resetPasswordRoutes = require("./Routes/v1/resetPassword.routes");
const productRoutes = require("./Routes/v1/products.routes");

// routes
app.use("/api/v1/user", usersRoutes);
app.use("/api/v1/products", productRoutes);
// app.use("/api/v1/reviews", reviewsRoutes);
// app.use("/api/v1/shipping", shippingRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// // +++++++++++Forgot Password++++++++++++
app.use("/api/v1/forgot-password", forgotPasswordRoutes);
app.use("/api/v1/reset-password", resetPasswordRoutes);

app.get("/", async (req, res) => {
  res
    .status(200)
    .json({ status: "SUCCESS", message: "This is a booster bd SERVER" });
});

app.all("*", (req, res) => {
  res.json({ message: "No route is found" });
});
// here is errorHandler function
app.use(errorHandler);

module.exports = app;
