const db = require("../config/db.config")

async function getAllProductsSQL() {
    try {
        const [products] = await db.execute("select * from products");
        return products;
    } catch (error) {
        console.log(error);
    }
}
async function addProductSQL(newProduct) {
    const { nameProduct, price, image, stock, cateId, description } =
        newProduct;
    try {
        const [result] = await db.execute(
            "insert into products (nameProduct,image,price,stock,cateId,description) values (?,?,?,?,?,?)",
            [nameProduct, image, +price, +stock, +cateId, description]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function updateProductSQL(nameProduct, price, image, stock, cateId, description, productId) {
    // const { nameProduct, price, image, stock, cateId, description, productId } =
    //     newProduct;
    try {
        const [result] = await db.execute(
            "update products set nameProduct = ?, image = ?, price = ?, stock = ?, cateId = ?, description = ? where productId = ?",
            [nameProduct, image, +price, +stock, +cateId, description, productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function deleteProductSQL(productId) {
    try {
        const [result] = await db.execute(
            "delete from products where productId = ?",
            [productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function getProductsByName(name) {
    try {
        const [products] = await db.execute(
            `select * from products where nameProduct like '%${name}%'`
        );
        return products;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllProductsSQL,
    addProductSQL,
    updateProductSQL,
    deleteProductSQL,
    getProductsByName
}