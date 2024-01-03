const db = require("../config/db.config");

async function getAllCateSQL() {
    const [cates] = await db.execute("select * from categories");
    return cates;
}

async function addCateSQL(nameCate) {
    const [cate] = await db.execute("insert into categories (nameCate) values (?)", [nameCate]);
    return cate.insertId
}

async function deleteCateSQL(cateId) {
    const [cate] = await db.execute("delete from categories where cateId = ?", [cateId]);
    return cate.insertId
}

async function updateCateSQL(nameCate, cateId) {
    const [cate] = await db.execute("update categories set nameCate = ? where cateId = ?", [nameCate, cateId]);
    return cate.insertId
}

module.exports = {
    getAllCateSQL,
    addCateSQL,
    deleteCateSQL,
    updateCateSQL
}