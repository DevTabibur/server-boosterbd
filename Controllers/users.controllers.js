const { json } = require("express");
const { ObjectId } = require("mongodb");
const { routes } = require("../app");
const _ = require("lodash");
const otpGenerator = require("otp-generator");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const User = require("../Models/users.model");
const Otp = require("../Models/otp.model");
const userService = require("../Services/users.services");
const generateToken = require("../Utils/generateToken");
require("dotenv").config();

module.exports.getAdmin = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result = await userService.getAdminService(email);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully getting an Admin",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get an Admin",
      error: error.message,
    });
  }
}

// module.exports.getMe = async (req, res, next) => {
//   try {
//     // decoded token is  here req.user
//     const userExists = await userService.findAUserByMail(req.user?.email);
//     res.status(200).json({
//       status: "success",
//       code: 200,
//       message: "successfully load this token verified api",
//       data: userExists,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       code: 400,
//       message: "Couldn't load this api",
//       err: err.message,
//     });
//   }
// };

module.exports.getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUserService();
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: `Successfully getting ${result.length} users`,
        data: result,
      });
    } else {
      res.status(200).json({
        status: "success",
        code: 200,
        message: `Successfully getting ${result.length} users`,
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      code: 400,
      message: "Couldn't get all users",
      err: err.message,
    });
  }
};

// module.exports.deleteAUserByID = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await userService.deleteAUserByIDService(id);
//     if (!result.deletedCount) {
//       return res.status(400).json({
//         status: "failed",
//         code: 400,
//         message: "Couldn't find this user to delete",
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         code: 200,
//         message: "successfully deleted this user",
//         data: result,
//       });
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       code: 400,
//       message: "Couldn't delete this user",
//       error: err.message,
//     });
//   }
// };

module.exports.getAUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log('id', id)
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This id is not valid",
      });
    }
    const result = await userService.getAUserByIDService(id);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Successfully getting this user",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get this user",
      error: error.message,
    });
  }
};

module.exports.makeUserAdmin = async (req, res, next) => {
  try {
    const { email } = req.params;
    console.log('makeUserAdmin', email)
    const result = await userService.makeUserAdminService(email);
    // res.status(200).json({
    //   status: "success",
    //   code: 200,
    //   message: "Successfully make this user an ADMIN",
    //   data: result,
    // });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't make an Admin",
      error: error.message,
    });
  }
};

module.exports.registerUser = async (req, res, next) => {
  try {
    // console.log("password", req.body);
    const user = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });

    // if (user) {
    //   return res
    //     .status(400)
    //     .json({ status: "failed", code: 400, message: "User already exists!" });
    // }

    const OTP = otpGenerator.generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const number = req.body.phoneNumber;
    const message = `Your BoosterBD OTP is: ${OTP}`;
    // console.log("message", message);

    // try {
    //   const url = `http://isms.mimsms.com/smsapi?api_key=${process.env.MIM_API_KEY}&type=text&contacts=${number}&senderid=${process.env.MIM_SENDER_ID}&msg=${message}`;

    // axios.post(url).then((data) => {
    //   if (data.status === 200) {
    //     console.log("otp sent");
    //   }
    // });
    // } catch (error) {
    //   console.log('otp didnot sent', error)
    // }
    const url = `http://isms.mimsms.com/smsapi?api_key=${process.env.MIM_API_KEY}&type=text&contacts=${number}&senderid=${process.env.MIM_SENDER_ID}&msg=${message}`;

    try {
      const response = await axios({
        method: 'post',
        url,
        timeout: 5000, // Timeout after 5 seconds
      });

      if (response.status === 200) {
        console.log('otp sent');
      }
    } catch (error) {
      console.log('otp did not send', error.message);
    }

    const otp = new Otp({ phoneNumber: req.body.phoneNumber, otp: OTP });
    const salt = await bcrypt.genSalt(10);
    otp.otp = await bcrypt.hash(otp.otp, salt);

    const result = await otp.save();
    // console.log("result", result);

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Otp send successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't register user",
      err: error.message,
    });
  }
};



module.exports.verifyOtp = async (req, res) => {
  try {
    // const result = await userService.registerUserService(req.body);
    // const token = generateToken(result);
    const otpHolder = await Otp.find({
      phoneNumber: req.body.phoneNumber,
    });
    if (otpHolder.length === 0) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Your'e using an Expired OTP!",
      });
    }

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
    // console.log("validUser", validUser);

    if (rightOtpFind.phoneNumber === req.body.phoneNumber && validUser) {
      // console.log("render");

      const salt = await bcrypt.genSalt(10);

      const password = await bcrypt.hash(req.body.password, salt);

      // console.log("password", password);

      const user = new User(_.pick(req.body, ["phoneNumber", "password"]));
      // console.log("user", user);
      const token = generateToken(user);
      const result = await user.save();
      const OTPDelete = await Otp.deleteMany({
        number: rightOtpFind.number,
      });
      return res.status(200).send({
        status: "success",
        code: 200,
        message: "User Registration Successful!",
        data: { result, token },
      });
    } else {
      return res.status(400).send("Your OTP was wrong!");
    }
  } catch (error) {
    res
      .status(400)
      .json({
        status: "failed",
        code: 400,
        message: "OTP Didn't verified",
        error: error.message,
      });
  }
};

// //  for login routes, here is few steps
// /**
//  *1. Check if email & password are given
//  *2. Load user with email
//  *3. if not user, send res
//  *4. compare password,
//  *5. if password not correct, send res
//  *6. check if user is active
//  *7. if not active send res
//  *8. if account is inactive , then active again, and then give entrance to our site
//  *8. generate token
//  *9. send user and token
//  */
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "Please provide your email & password",
      });
    }

    // checking if user is already in our db, or not?
    const userExists = await userService.findAUserByMail(email);
    // console.log("userExists", userExists);
    if (!userExists) {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "No user found. Please create an account",
      });
    }

    const isPasswordMatched = userExists.comparePassword(
      password,
      userExists.password
    );

    if (!isPasswordMatched) {
      return res.status(403).json({
        status: "failed",
        code: 403,
        error: "Password is not correct",
      });
    }

    // problem
    // if (userExists.status != "active") {
    //   return res.status(401).json({
    //     status: "failed",
    //     code: 401,
    //     error: "Your'e account is not active yet",
    //   });
    // }
    if (userExists.status === "blocked") {
      return res.status(401).json({
        status: "failed",
        code: 401,
        error: "Your'e account is blocked",
      });
    }

    if (userExists.status === "inactive") {
      return await User.updateOne(
        { _id: userExists?._id },
        { $set: { status: "active" } }
      );
      // return res.status(401).json({
      //   status: "failed",
      //   code: 401,
      //   error: "Your'e account is inactive",
      // });
    }

    const token = generateToken(userExists);
    const { password: pwd, ...others } = userExists.toObject();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully logged in",
      data: { user: others, token },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't login",
      error: err.message,
    });
  }
};

// // update profile
module.exports.UpdateProfileById = async (req, res, next) => {
  try {
    // console.log('files', req.files)
    // console.log('body', req.body)
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "Id is not valid",
      });
    }
    const result = await userService.UpdateProfileByIdService(
      id,
      req.body,
      req.files
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "successfully update profile",
        data: result,
      });
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "Couldn't update profile",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't update profile",
      error: error.message,
    });
  }
};

// // change password
// module.exports.changePassword = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     if (!ObjectId.isValid(id)) {
//       return res.status(400).json({
//         status: "failed",
//         code: 400,
//         message: "Couldn't find this id",
//       });
//     }
//     // checking if user is already in our db, or not?
//     const userExists = await User.findById({ _id: id });
//     if (!userExists) {
//       return res.status(401).json({
//         status: "failed",
//         code: 401,
//         error: "No user found. Please create an account",
//       });
//     }
//     const isPasswordMatched = userExists.comparePassword(
//       data.oldPassword,
//       userExists.password
//     );
//     if (!isPasswordMatched) {
//       return res.status(403).json({
//         status: "failed",
//         code: 403,
//         error: "Password is not correct",
//       });
//     }
//     const result = await userService.changePasswordService(id, data);
//     if (result.modifiedCount > 0) {
//       res.status(200).json({
//         status: "success",
//         code: 200,
//         message: "Successfully updated your password",
//         data: result,
//       });
//     } else {
//       res.status(400).json({
//         status: "failed",
//         code: 400,
//         message: "Couldn't update your password",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       status: "failed",
//       code: 400,
//       message: "Couldn't update your password",
//       error: error.message,
//     });
//   }
// };

// user log out and update status into "inactive"
module.exports.userLogOut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = req.body;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "failed",
        code: 400,
        message: "This id is not valid",
      });
    }
    const result = await userService.userLogOutService(id);
    // console.log("result", result);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Successfully getting this user",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't get this user",
      error: error.message,
    });
  }
};

// make a user verified
module.exports.makeUserVerified = async (req, res, next) => {
  try {
    // console.log('body',req.body)
    const {id} = req.params;
    const result = await userService.makeUserVerifiedService(id, req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      message: "successfully make this user verified",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "make a user verified is failed",
      error: error?.message
    })
  }
}
