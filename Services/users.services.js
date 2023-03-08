const User = require("../Models/users.model");
const bcrypt = require("bcryptjs");

module.exports.getAdminService = async (id) => {
  return await User.findById(id);
};

module.exports.makeUserAdminService = async (email) => {
  return User.updateOne({ email: email }, { $set: { role: "admin" } });
};

module.exports.findAUserByMail = async (email) => {
  return await User.findOne({ email });
};

module.exports.getAllUserService = async (data) => {
  return await User.find({});
};

module.exports.registerUserService = async (data) => {
  // console.log('data', data)
  return await User.create(data);
};

module.exports.getAUserByIDService = async (id) => {
  return await User.findById({ _id: id });
};

// module.exports.deleteAUserByIDService = async (id) => {
//   return await User.deleteOne({ _id: id });
// };

module.exports.UpdateProfileByIdService = async (id, body, files) => {
  // console.log('body,', body)
  // console.log('files,', files)
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
    completionRate: body?.completionRate,
    nid: body?.nid,
    tin: body?.tin,
    bin: body?.bin,
    imageURL: files?.imageURL[0]?.filename,
    binFile: files?.binFile?.length > 0 ? files.binFile[0].filename : null,
    tinFile: files?.tinFile?.length > 0 ? files.tinFile[0].filename : null,
    nidFile: files?.nidFile?.length > 0 ? files.nidFile[0].filename : null,
  };

  // console.log('data =>', data)
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


module.exports.makeUserVerifiedService = async (id, body) => {
  return await User.updateOne(
    { _id: id },
    { $set: { profile: body.profile } },
    { runValidators: true }
  );
}
