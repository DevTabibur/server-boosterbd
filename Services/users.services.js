const User = require("../Models/users.model");
const bcrypt = require("bcryptjs");

// module.exports.getAdminService = async (email) => {
//   return await User.findOne({ email });
// };

// module.exports.makeUserAdminService = async (email) => {
//   return User.updateOne({ email: email }, { $set: { role: "admin" } });
// };

module.exports.findAUserByMail = async (email) => {
  return await User.findOne({ email });
};

module.exports.getAllUserService = async (data) => {
  return await User.find({});
};

module.exports.registerUserService = async (data) => {
  console.log('data', data)
  return await User.create(data);
};

module.exports.getAUserByIDService = async (id) => {
  return await User.findById({ _id: id });
};

// module.exports.deleteAUserByIDService = async (id) => {
//   return await User.deleteOne({ _id: id });
// };

module.exports.UpdateProfileByIdService = async (id, body, file) => {
  const data = {
    email: body?.email,
    name: body?.name,
    phoneNumber: body?.phoneNumber,
    address: body?.address,
    whatsappNumber: body?.whatsappNumber,
    behance: body?.behance,
    companyWebsite: body?.companyWebsite,
    linkedInProfile: body?.linkedInProfile,
    githubProfile: body?.githubProfile,
    nid: body?.nid,
    tin: body?.tin,
    bin: body?.bin,
    imageURL: file?.filename,
  };
  return await User.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true }
  );
};

// module.exports.changePasswordService = async (id, data) => {
//   const hashedPassword = bcrypt.hashSync(data.confirmPassword);
//   return await User.updateOne(
//     { _id: id },
//     { $set: { password: hashedPassword } },
//     { runValidators: true }
//   );
// };

module.exports.userLogOutService = async (id) => {
  return await User.updateOne({ _id: id }, { $set: { status: "inactive" } });
};
