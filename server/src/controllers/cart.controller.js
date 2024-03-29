const { addNewProductToCart, checkProductInCart, updatePlusQuantity, getCartByUserId, deleteCartSQL, increSQL, deleteCartByUserId, getCartQuantityId } = require("../services/cart.service");
async function getCart(req, res) {
    const { user_id } = req.params
    try {
        const cart = await getCartByUserId(user_id)
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}

async function addToCart(req, res) {

    try {
        //Check xem sản phẩm đã có trong giỏ hàng hay chưa
        const check = await checkProductInCart(req.body.productId, req.params.user_id);
        if (!check) {
            // Nếu chưa có trong giỏ hàng thì thêm vào
            await addNewProductToCart(req.body, req.params.user_id);
            return res.status(201).json({
                message: "Them gio hang thanh cong"
            })
        }
        // Nếu đã có trong giỏ hàng thì tăng số lượng
        await updatePlusQuantity(req.body.productId, req.params.user_id);
        res.status(200).json({
            message: "Cap nhap so luong thanh cong"
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteCart(req, res) {
    const { cartId } = req.params;
    try {
        const result = await deleteCartSQL(cartId);
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        console.log(error);
    }
}

async function changeQuantity(req, res) {
    // console.log("33333", req.body)
    const { cartId, type } = req.body;
    try {
        const cart = await getCartQuantityId(cartId)
        if (cart.quantity <= 1) {
            await deleteCartSQL(cartId)
            return res.status(200).json({
                message: "Xoa san pham thanh cong",
            });
        }

        const result = await increSQL(cartId, type);
        res.status(200).json({
            message: "tăng số lượng thành công",
        });


    } catch (error) {
        console.log(error);

    }
}
async function deleteCartPayment(req, res) {
    const { user_id } = req.params
    try {
        await deleteCartByUserId(user_id)
        res.status(200).json({
            message: "Xoa gio hang thanh cong"
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    getCart,
    addToCart,
    deleteCart,
    changeQuantity,
    deleteCartPayment
}