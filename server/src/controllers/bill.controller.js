const { createBillMySql, getBillsMySql, getBillByAdminSql } = require("../services/bill.service");

async function createBill(req, res) {

    const { userId, address, phone, total } = req.body
    try {
        const newIdBill = await createBillMySql(userId, address, phone, total)
        res.status(201).json({
            newIdBill
        })
    } catch (error) {
        console.log(error)
    }
}

async function getBills(req, res) {
    const { userId } = req.params
    try {
        const bills = await getBillsMySql(userId)
        console.log(bills)
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}

async function getBillByAdmin(req,res) {

    try {
        const bills = await getBillByAdminSql()
        console.log(bills)
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createBill,
    getBills,
    getBillByAdmin

}