const { addProductSQL, getAllProductsSQL, updateProductSQL, deleteProductSQL, getProductsByName } = require("../services/product.service");

async function getAllProducts(req, res) {
    try {
        const products = await getAllProductsSQL();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}


async function addProduct(req, res) {
    try {
        const result = await addProductSQL(req.body);
        if (!result) {
            return res.status(500).json({
                message: "Co loi khi them san pham",
            });
        }
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Them san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { nameProduct, price, image, stock, cateId, description } =
            req.body;
        const result = await updateProductSQL(
            nameProduct, price, image, stock, cateId, description, id
        );
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Sua san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteProductSQL(id);
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Xoa san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error)
    }
}

async function getProductsBySearch(req, res) {
    const { key } = req.query;
    try {
        const result = await getProductsByName(key);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductsBySearch
}