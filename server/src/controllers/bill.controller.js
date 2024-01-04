const { createBillMySql, getBillsMySql, getBillByAdminSql, updateStatus, updateStocksProduct } = require("../services/bill.service");
const { getProductInBillMySql } = require("../services/bill_detail.service");

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
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}

async function getBillByAdmin(req, res) {

    try {
        const bills = await getBillByAdminSql()
        res.status(200).json({
            bills
        })
    } catch (error) {
        console.log(error)
    }
}

async function updateChangeStatus(req, res) {
    try {
        console.log(req.params);
        const { updateStatusS } = req.params;

        const { status } = req.body;
        const productInOrder = await getProductInBillMySql(updateStatusS);
        const changeStatus = await updateStatus(updateStatusS, status);
        if (status == "Xác nhận") {
            await Promise.all(
                productInOrder.map(
                    async (product) => await updateStocksProduct(product.productId, product.quantity)
                )
            );
        }
        const users = await getBillByAdminSql()
        res.status(200).json({ message: "Change Oke", users })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBill,
    getBills,
    getBillByAdmin,
    updateChangeStatus

}