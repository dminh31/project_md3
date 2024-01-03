const { createBillDetail } = require("../controllers/bill_detail.controller")

const billDetailRouter = (app) => {
    app.post("/api/v1/billDetail", createBillDetail)
}

module.exports = {
    billDetailRouter
}