const mongoose = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    serviceType: {
      type: String,
    },
    itemPrice: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    discountPrice: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    itemCode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subCategory: {
      type: String,
      trim: true,
      lowercase: true,
    },
    galleryImage: {
      type: String,
      required: true,
    },
    thumbnailImage: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    productDescriptionFile: {
      type: String,
    },
    tags: {
      type: String,
    },
    metaTag: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    metaDescription: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
