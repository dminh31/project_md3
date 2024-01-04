import React, { useEffect, useState } from 'react'
import publicAxios from '../../config/publicAxios';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function Cart() {
  const [cart, setCart] = useState([])
  const [flag, setFlag] = useState(false)
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("")
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // if (cart.length == 0) {
    //   failedNoti("Không có sản phẩm trong giỏ hàng ")
    //   return;
    // }
    setShow(true);
  }

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [total, setTotal] = useState(0)
  const handleTotalPrice = () => {
    let totalPrice = cart?.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    handleTotalPrice();
  }, [cart]);

  const userLogin = JSON.parse(localStorage.getItem("currentUser"));
  const handleGetCart = async () => {
    try {
      const response = await publicAxios.get(`/api/v1/cart/${userLogin.userId}`);
      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetCart()
  }, [flag])

  const handleDeleteCart = async (id) => {
    try {
      if (window.confirm("Ban muon xoa san pham")) {
        const res = await publicAxios.delete(`/api/v1/cart/${id}`);
        setFlag(!flag)
      }
    } catch (error) {
      console.log(11122221, error);
    }
  }

  const handleDecrease = async (id) => {
    const body = { cartId: id, type: "decre" }
    try {
      await publicAxios.patch(`/api/v1/cart`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  }

  const handleIncrease = async (id) => {
    const body = { cartId: id, type: "incre" }
    try {
      const res = await publicAxios.patch(`/api/v1/cart`, body);
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate()

  const handlePayment = async () => {
    if (!address || !phone) {

    }
    try {
      const bill = {
        userId: userLogin.userId,
        address,
        phone,
        total
      }
      const response = await publicAxios.post("/api/v1/bills", bill)
      const billDetail = {
        billId: response.data.newIdBill,
        cart
      }
      await publicAxios.post("/api/v1/billDetail", billDetail)
      await publicAxios.delete(`/api/v1/carts/${userLogin.userId}`)
      alert("Thanh toan thanh cong")
      setCart([])
      handleClose()
      navigate("/bill")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className="text-center mt-3">
        <h3 className="text-4xl font-extrabold">Giỏ hàng của bạn</h3>
        <div className="text-xl ">Có <span className=" font-bold">{cart?.length} sản phẩm</span>  trong giỏ</div>
        <div className="bg-black w-24 h-1 m-auto mt-3"></div>
        <div className="mt-1 px-5">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Thanh Toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="street"
                >
                  Địa chỉ
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="street"
                  type="text"
                  placeholder="Nhập tên đường"
                  onChange={(e) => setAddress(e.target.value)}
                /> <br /> <br />
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Nhập số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                /> <br />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} >
                Đóng
              </Button>
              <Button variant="primary" className="bg-slate-500" onClick={handlePayment}>
                Thanh Toán
              </Button>
            </Modal.Footer>
          </Modal>

          <table cellPadding={20} className="ml-[10%] text-xl w-[80%]" >
            <thead>
              <tr>
                <th></th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Thành tiền </th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cart?.map((item, index) => {
                return <tr key={index}>
                  <td><img src={item.image} className='w-[100px]' /></td>
                  <td>{item.nameProduct}</td>
                  <td className="text-[#b1c23c] font-semibold">{VND.format(item.price)}</td>
                  <td >
                    <div className="px-3">
                      <button className=" border-2 px-2" onClick={() => handleDecrease(item.cartId)}>-</button>
                      {item.quantity}
                      <button className=" border-2 px-2" onClick={() => handleIncrease(item.cartId)}>+</button>
                    </div>
                  </td>
                  <td className="text-[#b1c23c] font-semibold">{VND.format(item.price * item.quantity)}</td>
                  <td className="cursor-pointer " onClick={() => handleDeleteCart(item.cartId)}>X</td>
                </tr>
              })}
              <tr>
                <td colSpan={2} >Tổng tiền: <span className="text-[#b1c23c] font-semibold">{VND.format(total)}</span></td>
                <td colSpan={5} ><button className="ml-[75%] bg-[#343a40] text-white rounded-md p-2" onClick={handleShow}>Thanh toán</button></td>
              </tr>
            </tbody>
          </table>
          <hr className="w-[90%] m-auto" />
          {/* <div className="absolute top-1 text-[#b1c23c] font-extrabold ml-[87%]">{cart?.length}</div> */}
        </div>
      </div>
    </div>
  )
}
