const { getAllCates, addCate, deleteCate, updateCate } = require("../controllers/cate.controller");
const { verifyToken } = require("../middlewares/middleware");

const categoryRouter = (app) => {
    app.get("/api/v1/categories", getAllCates);
    app.post("/api/v1/categories", verifyToken, addCate)
    app.delete("/api/v1/categories/:id", verifyToken, deleteCate)
    app.put("/api/v1/categories/:id", verifyToken, updateCate)
}

module.exports = { categoryRouter }