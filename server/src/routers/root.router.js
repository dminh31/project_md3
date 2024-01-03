const authRouter = require("./auth.router");
const { userRouter } = require("../routers/user.router");
const { productRouter } = require("./product.router");
const { categoryRouter } = require("./cate.router");
const { cartRouter } = require("./cart.route");
const { billRouter } = require("./bill.routes");
const { billDetailRouter } = require("./bill_detail.routes");

const rootRouter = (app) => {
    authRouter(app),
        userRouter(app),
        productRouter(app),
        categoryRouter(app),
        cartRouter(app)
    billRouter(app)
    billDetailRouter(app)

};

module.exports = rootRouter;
