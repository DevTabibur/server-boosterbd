const jwt = require("jsonwebtoken");

const generateToken = (userInfo) => {
  console.log("userInfo", userInfo);
  const payload = {
    id: userInfo?._id,
    number: userInfo?.number,
    status:userInfo?.status,
    role: userInfo?.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = generateToken;