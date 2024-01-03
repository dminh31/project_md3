import React, { useEffect, useState } from 'react'
import axios from 'axios';
import publicAxios from '../../config/publicAxios'
import { failedNoti, successNoti } from "../../util/"
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "../Admin/AdminProduct.scss"
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
export default function AdminProduct() {
    const [preview, setPreview] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [product, setProduct] = useState([])
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState("")
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true)
    }

    const [newProduct, setNewProduct] = useState({
        nameProduct: "",
        price: 0,
        stock: 0,
        cateId: "",
        image: null,
        description: ""
    })

    const handleGetProducts = async () => {
        try {
            const response = await publicAxios.get("/api/v1/products");
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleGetCategories = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleGetCategories(),
            handleGetProducts()
    }, [])

    const handleAddMedia = (event) => {
        setSelectedMedia(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };


    const handleGetValue = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project-md3");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dqujxh3uc/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await publicAxios.post("/api/v1/products", {
                ...newProduct,
                image: media,
            });
            successNoti(response.data.message);
            setProduct(response.data.products);
            setNewProduct({
                nameProduct: "",
                price: 0,
                stock: 0,
                cateId: "",
                image: null,
                description: ""
            })
            setPreview(null)
            setShow(false)
        } catch (error) {
            failedNoti(error.response.data.message);
        }
    }

    const handleEdit = (item) => {
        setNewProduct(item)
        setPreview(item.image)
        setShow(true)
    }

    const handleSave = async () => {
        try {
            if (!selectedMedia) {
                const response = await publicAxios.put(
                    `/api/v1/product/${newProduct.productId}`,
                    newProduct
                );
                setProduct(response.data.products);
                return;
            }
            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project-md3");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dqujxh3uc/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await publicAxios.put(
                `/api/v1/product/${newProduct.productId}`,
                { ...newProduct, image: media }
            );
            console.log(response);
            setProduct(response.data.products);
            setShow()
            setNewProduct({
                nameProduct: "",
                price: 0,
                stock: 0,
                cateId: "",
                image: null,
                description: ""
            })
            setPreview(null)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await publicAxios.delete(`/api/v1/product/${id}`)
            successNoti(res.data.message)
            setProduct(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        try {
            const response = await publicAxios.get(
                `/api/v1/products/search?key=${search}`
            );
            setProduct(response.data);
        } catch (error) {
            console.log(error)
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = product.slice(startIndex, endIndex);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="admin">
            <header className="admin__header">
                <a href="#" className="logo">
                    <h1>FRESH GARDEN</h1>
                </a>
                <div className="toolbar">
                    <button className="btn btn--primary">Add New Plumbus</button>
                    <a href="#" className="logout">
                        Log Out
                    </a>
                </div>
            </header>
            <nav className="admin__nav">
                <ul className="menu">
                    <li className="menu__item">
                        <Link to={"/adminProduct"}><span className='text-2xl hover:text-pink-600'>Quan li san pham</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminBill"}><span className='text-2xl hover:text-pink-600'>Quan li don hang</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminUser"}><span className='text-2xl hover:text-pink-600'>Quan li nguoi dung</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminCate"}><span className='text-2xl hover:text-pink-600'>Quan li loai san pham</span></Link>
                    </li>

                </ul>
            </nav>


            <main className="admin__main">
                <Button
                    variant="primary"
                    onClick={handleShow}
                    className="bg-slate-500 text-[15px]"
                >
                    Them san pham
                </Button>
                <input type="text" onChange={(e) => setSearch(e.target.value)} className='ml-[200px]' />
                <button onClick={handleSearch}>Tìm kiếm</button>

                <Modal show={show} onHide={handleClose} className='h-[110vh]'>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Ten san pham
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name='nameProduct'
                                placeholder="Nhập tên san pham"
                                value={newProduct.nameProduct} onChange={handleGetValue}
                            // onChange={(e) => setAddress(e.target.value)}
                            /> <br />

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="cateId"
                            >
                                Loai san pham:
                            </label>
                            <select name="cateId" onChange={handleGetValue} value={newProduct.cateId}>
                                <option value="">Category</option>
                                {categories.map((category) => (
                                    <option value={category.cateId}>
                                        {category.nameCate}
                                    </option>
                                ))}
                            </select> <br />

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="image"
                            >
                                Anh san pham:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                name='image'
                                onChange={handleAddMedia}
                                hidden
                            />
                            <img src={preview} alt="" width={100} height={100} /><br />


                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="price"
                            >
                                Gia
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="text"
                                name='price'
                                placeholder="Nhập số điện thoại"
                                value={newProduct.price} onChange={handleGetValue}
                            /> <br />

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="stock"
                            >
                                So luong:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="stock"
                                type="text"
                                name='stock'
                                placeholder="Nhập số điện thoại"
                                value={newProduct.stock} onChange={handleGetValue}
                            /> <br />

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Description:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                name='description'
                                placeholder="Nhập số điện thoại"
                                value={newProduct.description} onChange={handleGetValue}
                            /> <br />

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="secondary" onClick={handleClose} >
                            Đóng
                        </Button> */}
                        <Button variant="primary" onClick={newProduct.productId ? handleSave : handleAdd} className="bg-slate-500">
                            {newProduct.productId ? "Save" : "Add"}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw] mt-2">
                    <div className="card-header">
                        <h5 className="mb-0 title">Danh Sách Sản Phẩm</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">Stt</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tên</th>
                                    {/* <th scope="col">Loại</th> */}
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="w-[100px] h-[120px]"
                                                />

                                            </td>
                                            <td>{item.nameProduct}</td>
                                            {/* <td>{item.cateId}</td> */}
                                            <td>{item.price}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <button
                                                    className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[80px]"
                                                    // variant="contained"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Sửa
                                                </button>
                                                <br />
                                                <br />
                                                <button
                                                    className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[80px]"
                                                    variant="contained"
                                                    onClick={() => handleDelete(item.productId)}
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id="changePage"></div>
                </div>
                <Pagination 
                    current={currentPage}
                    onChange={onPageChange}
                    pageSize={itemsPerPage}
                    total={product.length}
                    className="text-center"
                />

            </main>

            <footer className="admin__footer">
                <ul className="ticker">
                    <li className="ticker__item">BTC: +3.12%</li>
                    <li className="ticker__item">ETH: +1.29%</li>
                    <li className="ticker__item">XRP: -0.32%</li>
                    <li className="ticker__item">BCH: -2.82%</li>
                    <li className="ticker__item">EOS: +1.44%</li>
                    <li className="ticker__item">CSS: +13.37%</li>
                </ul>
                <span>© 2022 Fresh Garden</span>
            </footer>
        </div>




    )
}
