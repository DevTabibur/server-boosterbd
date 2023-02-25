const mongoose = require("mongoose");

const adAccountSchema = mongoose.Schema(
  {
    addAccountName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    addAccountNumber: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
      lowercase: true,
    },
    pageID: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    pageLink: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    pageName: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const AddAccount = mongoose.model("AddAccount", adAccountSchema);

module.exports = AddAccount;
