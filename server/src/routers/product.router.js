const { addProduct, getAllProducts, updateProduct, deleteProduct, getProductsBySearch } = require('../controllers/product.controller.js');


const productRouter = (app) => {
    app.get("/api/v1/products", getAllProducts);
    app.post("/api/v1/products", addProduct);
    app.put("/api/v1/product/:id", updateProduct)
    app.delete("/api/v1/product/:id", deleteProduct)
    app.get("/api/v1/products/search", getProductsBySearch);
}

module.exports = { productRouter }