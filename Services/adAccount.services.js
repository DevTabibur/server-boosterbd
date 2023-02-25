const AddAccount = require("../Models/adAccount.model");

module.exports.AdAccountServices = async (data) => {
  return await AddAccount.create(data);
};
module.exports.getAllRequestsAccountServices = async () => {
  return await AddAccount.find({});
};
