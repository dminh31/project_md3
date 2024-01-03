const { createBill, getBills } = require("../controllers/bill.controller")

const billRouter = (app) => {
    app.post("/api/v1/bills", createBill)
    app.get("/api/v1/bills/:userId",getBills)
}
module.exports = {
    billRouter
}