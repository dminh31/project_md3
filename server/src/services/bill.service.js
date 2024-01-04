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
        const [result] = await db.execute("select * from bills  where userId = ?", [userId]);
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getBillByAdminSql() {

    try {
        const [result] = await db.execute("select * from bills join users on bills.userId = users.userId");
        return result
    } catch (error) {
        console.log(error)
    }
}

async function updateStatus(id, status) {
    console.log("thong tin: ", id, status);
    try {
        const [result] = await db.execute("update bills set status = ? where billId = ?", [status, id])
        return result.insertId
    } catch (error) {
        console.log(error)
    }
};

async function updateStocksProduct(product_id, quantity) {
    try {
        const [result] = await db.execute(
            "update products set stock = stock - ? where productId = ?",
            [quantity, product_id]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createBillMySql,
    getBillsMySql,
    getBillByAdminSql,
    updateStatus,
    updateStocksProduct
}