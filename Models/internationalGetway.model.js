const mongoose = require("mongoose");


const internationalPaymentGatewayTopUpSchema = mongoose.Schema({
    paymentMethod: {
        type: String,
        trim: true, lowercase: true
    },
    paymentFor: {
        type: String,
        required: [true, "Payment for is required"]
    },
    amountToAdd: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Amount is required is required"]
    },
    paymentGateway: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Which gateway your'e using"]
    },
    accountMail: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Account Email is required"]
    },
    customerAccountMail: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Customer Account Email is required"]
    },
    internationalGatewayProof: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Proof of payment is required"]
    }
}, {
    timestamps: true
})


const InternationalGateway = mongoose.model("InternationalGateway", internationalPaymentGatewayTopUpSchema)


module.exports = InternationalGateway;