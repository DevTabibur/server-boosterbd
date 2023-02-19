const express = require("express");
const router = express.Router();
const uploader = require("../../Middleware/uploader");
const verifyAdmin = require("../../Middleware/verifyAdmin");
const authorization = require("../../Middleware/authorization");
const verifyToken = require("../../Middleware/verifyToken");

const productsController = require("../../Controllers/products.controller");

const upload = uploader.fields([{ name: "galleryImage", maxCount: 1 }]);

router.route("/add-service").post(
  verifyToken,
  //   authorization("admin"),
  upload,
  productsController.AddServiceController
);

module.exports = router;
