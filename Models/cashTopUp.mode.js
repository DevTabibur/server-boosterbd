const mongoose = require("mongoose");


const cashTopUpSchema = mongoose.Schema({
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
    paidTo: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Payment agent is required"]
    },
    cashProof: {
        type: String,
        trim: true, lowercase: true,
        required: [true, "Proof of payment is required"]
    }
}, {
    timestamps: true
})


const CashTopUp = mongoose.model("CashTopUp", cashTopUpSchema)


module.exports = CashTopUp;