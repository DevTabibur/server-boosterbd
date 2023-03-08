const mongoose = require("mongoose");


const internetBankingTopUpSchema = mongoose.Schema({
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
    selectBank: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Selection of Bank required is required"]
    },
    accountNumber: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Account Number is required"]
    },
    customerAccountNumber: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Customer Account Number is required"]
    },
    internetBankingProof: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Proof of payment is required"]
    }
}, {
    timestamps: true
})


const InternetBankingTopUp = mongoose.model("InternetBankingTopUp", internetBankingTopUpSchema)


module.exports = InternetBankingTopUp;