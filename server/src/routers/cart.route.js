const { addToCart, getCart, deleteCart, changeQuantity, deleteCartPayment } = require("../controllers/cart.controller")


const cartRouter = (app) => {
    app.get("/api/v1/cart/:user_id", getCart)
    app.post("/api/v1/cart/:user_id", addToCart)
    app.delete("/api/v1/cart/:cartId", deleteCart)
    app.patch("/api/v1/cart", changeQuantity);
    app.delete("/api/v1/carts/:user_id", deleteCartPayment)
}

module.exports = {
    cartRouter
}