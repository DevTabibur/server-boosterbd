const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  // console.log("userInfo", userInfo);
  const payload = {
    id: userInfo?._id,
    number: userInfo?.phoneNumber,
    password: userInfo?.password,
    status: userInfo?.status,
    role: userInfo?.role,
  };
  // console.log('payload', payload)
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = generateToken;