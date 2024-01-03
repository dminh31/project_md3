const { createBillDetailMySql, getProductInBillMySql } = require("../services/bill_detail.service");
async function getProductInBill(req, res) {
    const { billId } = req.params
    try {
        const products = await getProductInBillMySql(billId)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}

async function createBillDetail(req, res) {
    try {
        const { billId, cart } = req.body;
        await Promise.all(
            cart.map(async (product) => await createBillDetailMySql(billId, product.productId, product.quantity))
        )
        res.status(200).json({
            message: "Tạo chi tiết bill thành công"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProductInBill,
    createBillDetail
}