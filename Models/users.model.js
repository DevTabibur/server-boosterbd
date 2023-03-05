const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Provide a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "buyer"],
      default: "user",
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    whatsappNumber: {
      type: String,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valid mobile number",
      // ],
    },
    behance: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    linkedInProfile: {
      type: String,
    },
    githubProfile: {
      type: String,
    },
    completionRate: {
      type: String,
    },
    address: String,
    imageURL: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image"],
    },
    nid: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image"],
    },
    nidFile: {
      type: String,
    },
    bin: {
      type: String,
    },
    binFile: { type: String },
    tin: {
      type: String,
    },
    tinFile: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      enum: ["India", "Bangladesh", "America", "Others"],
      default: "Bangladesh",
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked", "disable"],
    },
    profile: {
      type: String,
      default: "unverified",
      enum: ["unverified", "verified", "completed", "disabled", "closed", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

// hash password before adding it on database

userSchema.pre("save", function (next) {
  const salt = bcrypt.genSaltSync(10);
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password, salt);
  (this.password = hashedPassword), (this.confirmPassword = undefined);
  next();
});

userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
  return isPasswordMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
