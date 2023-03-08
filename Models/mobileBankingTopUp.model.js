const mongoose = require("mongoose");


const mobileBankingTopUpSchema = mongoose.Schema({
    paymentMethod: {
        type: String,
        trim: true, lowercase: true
    },
    paymentFor: {
        type: String,
        required: [true, "Payment for is required"]
    },
    paymentWith: {
        type: String,
        required: [true, "Payment for is required"]
    },
    amountToAdd: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Amount is required is required"]
    },
    senderNumber: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Number required is required"]
    },
    paidTo: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Payment agent is required"]
    },
    transactionID: {
        type: String
    },
    transactionScreenShot: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Proof of payment is required"]
    }
}, {
    timestamps: true
})


const MobileBankingTopUp = mongoose.model("MobileBankingTopUp", mobileBankingTopUpSchema)


module.exports = MobileBankingTopUp;