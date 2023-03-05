const adLimitRequestsServices = require("../Services/adLimitRequests.services");

module.exports.limitAdRequests = async (req, res, next) => {
  try {
    const result = await adLimitRequestsServices.limitAdRequestsServices(
      req.body
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message:
        "Your limit request is successful.. please wait for confirmation",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Your limit request didn't successful",
      error: error.message,
    });
  }
};
