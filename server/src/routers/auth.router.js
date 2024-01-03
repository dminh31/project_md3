const { register, login } = require("../controllers/auth.controller");
const {
    checkEmailExist,
    checkEmpty,
    checkEmailLogin,
} = require("../middlewares/middleware");

const authRouter = (app) => {
    //sign up
    app.post("/api/auth/signup", checkEmpty, checkEmailExist, register);
    //login
    app.post("/api/auth/login", checkEmpty, login);
};

module.exports = authRouter;
