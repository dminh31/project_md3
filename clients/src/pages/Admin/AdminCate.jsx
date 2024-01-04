import React, { useEffect, useState } from 'react'
import privateAxios from '../../config/privateAxios'
import publicAxios from '../../config/publicAxios'
import { failedNoti, successNoti } from "../../util/"
import { Link } from 'react-router-dom'

export default function AdminCate() {
    const [newCate, setNewCate] = useState({
        nameCate: ""
    })
    const [categories, setCategories] = useState([])
    const handleGetAllCate = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            // alert(error.response.data.message);
        }
    };
    useEffect(() => {
        handleGetAllCate();
    }, []);
    
    const handleAddCate = async () => {
        const newCateGory = {
            nameCate: newCate
        }
        try {
            const response = await privateAxios.post("/api/v1/categories", newCateGory.nameCate)
            setCategories(response.data.cates)
            alert(response.data.message)
            setNewCate({
                nameCate: ""
            })
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const handleEdit = (item) => {
        setNewCate(item)
    }

    const handleSave = async () => {
        console.log("aaa", newCate);
        try {
            const res = await privateAxios.put(`/api/v1/categories/${newCate.cateId}`, newCate)
            setCategories(res.data.cates)
            setNewCate({
                nameCate: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const res = await privateAxios.delete(`/api/v1/categories/${id}`)
            setCategories(res.data.cates)
            successNoti(res.data.message)
        } catch (error) {
            failedNoti(error.response.data.message)
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("token")
        window.location.href = "/login "
    }

    return (
        <div className="admin">
            <header className="admin__header">
                <a href="#" className="logo">
                    <h1>FRESH GARDEN</h1>
                </a>
                <div className="toolbar">
                    <button className="btn btn--primary">Add New Plumbus</button>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </header>
            <nav className="admin__nav">
                <ul className="menu">
                    <li className="menu__item">
                        <Link to={"/adminProduct"}><span className='text-2xl hover:text-pink-600 '>Quản lí sản phẩm</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminBill"}><span className='text-2xl hover:text-pink-600 ' >Quản lí đơn hàng</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminUser"}><span className='text-2xl hover:text-pink-600'>Quản lí người dùng</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminCate"}><span className='text-2xl hover:text-pink-600'>Phân loại sản phẩm</span></Link>
                    </li>

                </ul>
            </nav>


            <main className="admin__main">
                <div>
                    <label htmlFor="" className='text-2xl'>Loai san pham:</label>
                    <input type="text" className='ml-2' name='nameCate' value={newCate.nameCate} onChange={(e) => setNewCate({ ...newCate, nameCate: e.target.value })} />
                    <br />
                    <button className='text-2xl' onClick={newCate.cateId ? handleSave : handleAddCate}>{newCate.cateId ? "Lưu" : "Thêm"}</button>
                    
                </div>

                <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
                    <div className="card-header">
                        <h5 className="mb-0 title ">Danh Sách Sản Phẩm</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">Stt</th>
                                    <th scope="col">Tên </th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.nameCate}</td>
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
                                                    onClick={() => handleDelete(item.cateId)}
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
                <span>© 2018 Grid Inc.</span>
            </footer>
        </div>

    )
}
