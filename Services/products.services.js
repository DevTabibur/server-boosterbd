const Products = require("../Models/products.model");

module.exports.AddServiceService = async (body, files) => {
  const data = {
    serviceName: body?.serviceName,
    serviceType: body?.serviceType,
    itemPrice: body?.itemPrice,
    discountPrice: body?.discountPrice,
    itemCode: body?.itemCode,
    category: body?.category,
    subCategory: body?.subCategory,
    tags: body?.tags,
    metaTag: body?.metaTag,
    productDescription: body?.productDescription,
    metaDescription: body?.metaDescription,

    galleryImage: files?.["galleryImage"]?.filename,
    thumbnailImage: files?.["thumbnailImage"]?.filename,
    productDescriptionFile: files?.["productDescriptionFile"]?.filename,
  };
  return await Products.create(data);
};
