const { getAllCateSQL, addCateSQL, deleteCateSQL, updateCateSQL } = require("../services/cate.service");
async function getAllCates(req, res) {
    try {
        const categories = await getAllCateSQL();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
    }
}

async function addCate(req, res) {
    try {
        const { nameCate } = req.body
        const result = await addCateSQL(nameCate)
        if (!result) {
            return res.status(500).json({
                message: "Them category that bai",
            });
        }
        const cates = await getAllCateSQL();
        res.status(200).json({
            message: "Them category thanh cong",
            cates,
        });
    } catch (error) {
        console.log(error)
    }
}

async function deleteCate(req, res) {
    const { id } = req.params
    const result = await deleteCateSQL(id)
    const cates = await getAllCateSQL()
    res.status(200).json({
        message: "Xoa thanh cong",
        cates
    })
}

async function updateCate(req, res) {
    const { id } = req.params
    const { nameCate } = req.body
    const result = await updateCateSQL(nameCate, id)
    const cates = await getAllCateSQL()
    res.status(200).json({
        message: "Cap nhat thanh cong",
        cates
    })
}

module.exports = {
    getAllCates,
    addCate,
    deleteCate,
    updateCate
}