import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import publicAxios from '../../config/publicAxios'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import privateAxios from '../../config/privateAxios';
export default function AdminBill() {
    const [bills, setBills] = useState([])
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleGetBills = async () => {
        try {
            const res = await publicAxios.get("/api/v1/bills")
            console.log(res.data.bills)
            setBills(res.data.bills)
        } catch (error) {
            console.log(error)
        }
    }

    const [show, setShow] = useState(false);
    const [infoDetail, setInfoDetails] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = async (details) => {
        console.log(details);
        setShow(true);
        try {
            const response = await privateAxios.get(`/api/v1/billDetail/${details.billId}`)
            setInfoDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    // const [flag, setFlag] = useState(true)
    const handleChangeStatus = async (id, status) => {
        let accept = window.confirm("Bạn muốn thực hiện hành đông không");
        if (accept) {
            await privateAxios.put(`/api/v1/update/${id}`, {
                status: status,
            });
        }
        await handleGetBills();
        // setFlag(!flag);
    }

    const handleLogOut = () => {
        localStorage.removeItem("currentUser")
        localStorage.removeItem("token")
        window.location.href = "/login "
    }

    useEffect(() => {
        handleGetBills()
    }, [])

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
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">Stt</th>
                                    <th scope="col">Tên </th>
                                    <th scope="col">Thong tin don hang </th>
                                    <th scope="col">Tong tien </th>
                                    <th scope="col">Trang thai </th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.username}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                onClick={() => handleShow(item)}
                                                className="bg-slate-500 text-[15px]"
                                            >
                                                Xem Chi Tiết
                                            </Button>
                                        </td>
                                        <td>{VND.format(item.total)}</td>
                                        <td>
                                            {item.status === "Đang xử lý" ? (
                                                <span style={{ color: "green" }}>Đang Chờ</span>
                                            ) : item.status === "Xác nhận" ? (
                                                <span style={{ color: "blue" }}>Xác nhận</span>
                                            ) : (
                                                <span style={{ color: "red" }}>Từ chối</span>
                                            )}
                                            {/* {item.status} */}
                                        </td>
                                        <td>
                                            <button onClick={() => handleChangeStatus(item.billId, "Đã hủy")}>Hủy đơn</button>
                                            <button onClick={() => handleChangeStatus(item.billId, "Xác nhận")}>Đồng ý</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sản Phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {infoDetail.map((item) => (
                                    <div className="titles_produsctsx text-center">
                                        <hr />
                                        <p>Tên: {item.nameProduct}</p>
                                        <p>Số Lượng: {item.quantity}</p>
                                        <p>Giá Sản Phẩm: {VND.format(item.price)}</p>
                                        <p>Thời gian mua hàng: {item.createdAt}</p>
                                        <p>Địa chỉ nhận: {item.address}</p>
                                    </div>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
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
