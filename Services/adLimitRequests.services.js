const Limit = require("../Models/adLimitRequests.model");

module.exports.limitAdRequestsServices = async (data) => {
  return await Limit.create(data);
};
