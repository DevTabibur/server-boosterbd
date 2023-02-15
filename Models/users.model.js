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
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      this.password,
      "ed08437f8134d9fe7514a93d2cc18538b47bac29b67eb3aeca1c1d3249494ea043fd9a0c640d6fd723616733c515ec1e6a5a37f3cc15616c9f8c7a0401fbbebb"
    );
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// userSchema.pre("save", function (next) {
//   const password = this.password;
//   const hashedPassword = bcrypt.hashSync(password);
//   console.log('hashedPassword', hashedPassword)
//   this.password = hashedPassword;
//   //   , (this.confirmPassword = undefined);
//   next();
// });

userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
  return isPasswordMatched;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
