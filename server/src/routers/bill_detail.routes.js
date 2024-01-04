const { createBillDetail, getProductInBill } = require("../controllers/bill_detail.controller")
const { verifyToken } = require("../middlewares/middleware")

const billDetailRouter = (app) => {
    app.get("/api/v1/billDetail/:billId", getProductInBill)
    app.post("/api/v1/billDetail", createBillDetail)
}

module.exports = {
    billDetailRouter
}