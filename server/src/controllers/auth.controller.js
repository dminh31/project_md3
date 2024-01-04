const { addUser, checkUserByEmail } = require("../services/user.service");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config()

async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await argon.hash(password);
        console.log(hashedPassword)
        const newId = await addUser(username, hashedPassword, email);
        if (!newId) {
            return res.status(500).json({
                message: "Server loi",
            });
        }
        res.status(201).json({
            message: "Dang ky thanh cong",
        });
    } catch (error) {
        console.log(error);
    }
}

async function login(req, res) {

    const { email, password } = req.body;
    try {
        const findUser = await checkUserByEmail(email);
        if (!findUser) {
            return res.status(400).json({ message: "Email khong ton tai" });
        }
        if (findUser.status_user == 1) {
            return res.status(400).json({ message: "Tai khoan bi khoa" });
        }
        // console.log(findUser)
        const checkPassowrd = await argon.verify(findUser.password, password);
        if (!checkPassowrd) {
            return res.status(400).json({ message: "Sai mat khau" });
        }

        const token = jwt.sign(
            { id: findUser.id, role: findUser.role },
            process.env.SECRET_KEY
        );
        res.status(200).json({
            message: "Dang nhap thanh cong",
            token,
            currentUser: findUser
        });
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    register,
    login,
};
