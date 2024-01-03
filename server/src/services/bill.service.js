const db = require("../config/db.config");

async function createBillMySql(userId, address, phone, total) {

    try {
        const [result] = await db.execute("insert into bills (userId, address, phoneNumber,total, createdAt) values (?,?,?,?, CURRENT_TIMESTAMP())", [userId, address, phone, total]);
        return result.insertId
    } catch (error) {
        console.log(error)
    }
}

async function getBillsMySql(userId) {

    try {
        const [result] = await db.execute("select * from bills join bill_detail on bills.billId = bill_detail.bill_id join products on bill_detail.productId = products.productId where userId = ?", [userId]);
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createBillMySql,
    getBillsMySql
}