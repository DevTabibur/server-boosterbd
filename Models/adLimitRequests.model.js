const mongoose = require("mongoose");

const adLimitRequestsSchema = mongoose.Schema(
  {
    limitAdAccountName: {
      type: String,
      required: [true, "Limit Account is required"],
    },
    rechargeAmount: {
      type: String,
      required: [true, "Please provide a valid amount"],
    },
  },
  { timestamps: true }
);

const Limit = mongoose.model("Limit", adLimitRequestsSchema);

module.exports = Limit;
