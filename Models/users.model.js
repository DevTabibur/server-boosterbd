const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const config = require("../Utils/config");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: [true, "This Email is already in use"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      //   validate: {
      //     validator: (value) =>
      //       validator.isStrongPassword(value, {
      //         minLength: 6,
      //       }),
      //     message: "Password {value} is not strong enough",
      //   },
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Confirm Password is required"],
    //   validate: {
    //     validator: function (value) {
    //       return value === this.password;
    //     },
    //     message: "Password don't match",
    //   },
    // },
    role: {
      type: String,
      enum: ["user", "admin", "buyer"],
      default: "user",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name is too short"],
      maxLength: [100, "Name is too large"],
    },
    phoneNumber: {
      type: String,
      // validate: [
      //   validator.isMobilePhone,
      //   "Please provide a valid mobile number",
      // ],
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
    address: String,
    imageURL: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image"],
    },
    nid: {
      type: String,
      // validate: [validator.isURL, "Please provide a valid image"],
    },
    bin: {
      type: String,
    },
    tin: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive", "blocked"],
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
  console.log("hashedPassword", hashedPassword);
  next();
});

userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
  return isPasswordMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
