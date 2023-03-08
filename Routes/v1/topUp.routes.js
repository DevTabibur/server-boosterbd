const express = require("express");
const router = express.Router()
const topUpController = require("../../Controllers/topUp.controller");
const uploader = require("../../Middleware/uploader");



router.route("/").get(topUpController.getAllTopUp)

// cash routes
router.route("/cash").post(uploader.single("cashProof"), topUpController.postCashTopUp)
// mobile banking routes
router.route("/mobile-banking").post(uploader.single("transactionScreenShot"), topUpController.postMobileBankingTopUp)
// internet banking routes
router.route("/internet-banking").post(uploader.single("internetBankingProof"), topUpController.postInternetBankingTopUp)
// internet banking routes
router.route("/international-payment-gateway").post(uploader.single("internationalGatewayProof"), topUpController.postInternationalGateway)

module.exports = router;