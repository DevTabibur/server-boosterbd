const topUpServices = require("../Services/topUp.services")


module.exports.getAllTopUp = async (req, res, next) => {
    try {
        const result = await topUpServices.getAllTopUpServices();
        res.status(200).json({
            status: 'success',
            code: 200,
            message: `successfully getting ${result.length} top-up collection`,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "Can't get top-up collection",
            error: error?.message
        })

    }
}


module.exports.postCashTopUp = async (req, res, next) => {
    try {
        const result = await topUpServices.postCashTopUp(req.body, req.file);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully submit cash top-up",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "didn't confirmed cash proof",
            error: error?.message
        })
    }
}

// mobile banking
module.exports.postMobileBankingTopUp = async (req, res, next) => {
    try {
        const result = await topUpServices.postMobileBankingTopUpServices(req.body, req.file);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully submit mobile-banking top-up",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "didn't confirmed mobile-banking top-up",
            error: error?.message
        })
    }
}


// internet banking
module.exports.postInternetBankingTopUp = async (req, res, next) => {
    try {
        const result = await topUpServices.postInternetBankingTopUpServices(req.body, req.file);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully submit internet-banking top-up",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "didn't confirmed internet-banking top-up",
            error: error?.message
        })
    }
}
// international payment gateway
module.exports.postInternationalGateway = async (req, res, next) => {
    try {
        const result = await topUpServices.postInternationalGatewayServices(req.body, req.file);
        res.status(200).json({
            status: "success",
            code: 200,
            message: "successfully submit international payment gateway top-up",
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            code: 400,
            message: "didn't confirmed international payment gateway top-up",
            error: error?.message
        })
    }
}