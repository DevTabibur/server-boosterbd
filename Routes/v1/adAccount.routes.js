const express = require("express");
const router = express.Router();
const AdAccountController = require("../../Controllers/adAccount.controller");
const authorization = require("../../Middleware/authorization");
const verifyToken = require("../../Middleware/verifyToken");

router.route("/").get(AdAccountController.getAllRequestsAccount).post(verifyToken, AdAccountController.AdAccount);

module.exports = router;
