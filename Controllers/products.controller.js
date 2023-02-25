const productsService = require("../Services/products.services");

module.exports.AddServiceController = async (req, res, next) => {
  try {
    console.log('body', req.body)
    console.log('files', req.files)
    console.log('galleryImage', req.files["galleryImage"])
    console.log('thumbnailImage', req.files["thumbnailImage"])
    console.log('productDescriptionFile', req.files["productDescriptionFile"])

    // const result = await productsService.AddServiceService(req.body, req.file);
    // res.status(200).json({
    //   status: "success",
    //   code: 200,
    //   message: "add service is successful",
    //   data: result,
    // });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      code: 400,
      message: "Couldn't add service",
      error: error.message,
    });
  }
};
