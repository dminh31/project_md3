const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductsBySearch } = require('../controllers/product.controller.js');
const { verifyToken } = require('../middlewares/middleware.js');

const productRouter = (app) => {
    app.get("/api/v1/products",  getAllProducts);
    app.post("/api/v1/products", verifyToken, addProduct);
    app.put("/api/v1/product/:id", verifyToken, updateProduct)
    app.delete("/api/v1/product/:id", verifyToken, deleteProduct)
    app.get("/api/v1/products/search", verifyToken, getProductsBySearch);
}

module.exports = { productRouter }