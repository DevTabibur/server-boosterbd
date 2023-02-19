const Products = require("../Models/products.model")

module.exports.AddServiceService = (body, file) =>{
    return Products.create({body})
}