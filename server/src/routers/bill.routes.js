const { createBill, getBills, getBillByAdmin, updateChangeStatus } = require("../controllers/bill.controller")
const { verifyToken } = require("../middlewares/middleware")

const billRouter = (app) => {
    app.post("/api/v1/bills", createBill)
    app.get("/api/v1/bills/:userId", getBills)
    app.get("/api/v1/bills", getBillByAdmin)
    app.put("/api/v1/update/:updateStatusS", verifyToken, updateChangeStatus)
}
module.exports = {
    billRouter
}