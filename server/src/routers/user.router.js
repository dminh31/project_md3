const { getUsers, updateStatusUser } = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/middleware");

const userRouter = (app) => {
    app.get("/api/users", verifyToken, getUsers);
    app.patch("/api/user/:id", verifyToken, updateStatusUser)
};
module.exports = {
    userRouter,
};
