const db = require("../config/db.config");

async function createBillDetailMySql(billId, productId, quantity) {

    try {
        const [result] = await db.execute("insert into bill_detail (bill_id, quantity, productId) values (?,?,?)", [billId, quantity, productId]);
        return result
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createBillDetailMySql
}