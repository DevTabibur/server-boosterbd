const CashTopUp = require("../Models/cashTopUp.mode")
const InternationalGateway = require("../Models/internationalGetway.model")
const InternetBankingTopUp = require("../Models/internetBankingTopUp.model")
const MobileBankingTopUp = require("../Models/mobileBankingTopUp.model")
const Transaction = require("../Models/transaction.model")

module.exports.getAllTopUpServices = async () => {
    return await Transaction.find()
}


module.exports.postCashTopUp = async (body, file) => {
    const data = {
        paymentMethod: body?.paymentMethod,
        paymentFor: body?.paymentFor,
        paidTo: body?.handlePaidToSelected,
        amountToAdd: body?.amountToAdd,
        cashProof: file?.filename
    }
    return await CashTopUp.create(data)
}


// mobile banking
module.exports.postMobileBankingTopUpServices = async (body, file) => {
    // console.log('body', body)
    // console.log('file', file)
    const data = {
        paymentMethod: body?.paymentMethod,
        paymentFor: body?.paymentFor,
        paymentWith: body?.paymentWith,
        paidTo: body?.paidTo,
        amountToAdd: body?.amountToAdd,
        transactionID: body?.transactionID,
        senderNumber: body?.senderNumber,
        transactionScreenShot: file?.filename,

    }
    // console.log('data', data)
    return await MobileBankingTopUp.create(data)
}


// internet banking
module.exports.postInternetBankingTopUpServices = async (body, file) => {
    // console.log('body', body)
    // console.log('file', file)
    const data = {
        paymentMethod: body?.paymentMethod,
        paymentFor: body?.paymentFor,
        amountToAdd: body?.amountToAdd,
        selectBank: body?.selectBank,
        accountNumber: body?.accountNumber,
        customerAccountNumber: body?.customerAccountNumber,
        internetBankingProof: file?.filename,

    }
    // console.log('data', data)
    return await InternetBankingTopUp.create(data)
}
// international payment gateway
module.exports.postInternationalGatewayServices = async (body, file) => {
    // console.log('body', body)
    // console.log('file', file)
    const data = {
        paymentMethod: body?.paymentMethod,
        paymentFor: body?.paymentFor,
        amountToAdd: body?.amountToAdd,
        paymentGateway: body?.paymentGateway,
        accountMail: body?.accountMail,
        customerAccountMail: body?.customerAccountMail,
        internationalGatewayProof: file?.filename,

    }
    // console.log('data', data)
    return await InternationalGateway.create(data)
}