const express = require("express");
const router = express.Router();
const limitAdRequestsController = require("../../Controllers/adLimitRequests.controller");

router.route("/").post(limitAdRequestsController.limitAdRequests);

module.exports = router;
