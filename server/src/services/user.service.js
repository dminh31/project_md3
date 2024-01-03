const db = require("../config/db.config");
require("dotenv").config()
async function getAllUsers() {
    try {
        const [user] = await db.execute("select * from users");
        return user;
    } catch (error) {
        console.log(error);
    }
}
async function getUserById(id) {
    try {
        const [findUser] = await db.execute("select * from users where userId = ?", [
            id,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function checkUserByEmail(email) {
    try {
        const [findUser] = await db.execute("select * from users where email = ?", [
            email,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function addUser(username, password, email) {
    try {
        const [result] = await db.execute("insert into users (username, password, email) values (?, ?, ?)",
            [username, password, email]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function updateStatus(id, status) {
    try {
        const [result] = await db.execute("update users set status = ? where userId = ?", [status, id])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    checkUserByEmail,
    updateStatus,
};
