const AddAccountService = require("../Services/adAccount.services");
module.exports.AdAccount = async (req, res, next) => {
  try {
    const result = await AddAccountService.AdAccountServices(req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't create account",
      error: error.message,
    });
  }
};

module.exports.getAllRequestsAccount = async (req, res, next) => {
  try {
    const result = await AddAccountService.getAllRequestsAccountServices();
    res.status(200).json({
      status: "success",
      code: 200,
      message: `successfully get  ${result.length} account requests`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get all accounts",
      error: error.message,
    });
  }
};
