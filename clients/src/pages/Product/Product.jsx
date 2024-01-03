import React, { useEffect, useState } from "react";
import { Button, Pagination } from "antd";
import { failedNoti, successNoti } from "../../util/index";
import { useNavigate } from "react-router-dom";
import publicAxios from "../../config/publicAxios";
export default function Products() {
    const [listProduct, setListProduct] = useState([]);
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [cart, setCart] = useState([])
    const [flag, setFlag] = useState(false)
    const handleGetCart = async () => {
        try {
            const res = await publicAxios.get(`/api/v1/cart/${currentUser.userId}`);
            setCart(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCategory = async () => {
        try {
            const res = await publicAxios.get("/api/v1/categories");
            setData(res.data);
        } catch (error) {
            console.log(error)
        }
    };

    const handleGetProducts = async () => {
        try {
            const res = await publicAxios.get("/api/v1/products");
            setListProduct(res.data)
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        handleGetCart()
        handleGetProducts();
        handleGetCategory();
    }, [flag]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const handleProducts = (cateId) => {
        setSelectedCategory(cateId)
    }


    const handleAddToCart = async (product) => {
        if (!currentUser) {
            failedNoti("Đăng nhập để mua hàng")
        }
        try {
            const response = await publicAxios.post(`/api/v1/cart/${currentUser.userId}`, product)
            alert(response.data.message)
            setFlag(!flag)
        } catch (error) {
            console.log(error)
        }
    }

    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 6;
    // const endIndex = currentPage * itemsPerPage;
    // const startIndex = endIndex - itemsPerPage;
    // const displayedProducts = listProduct.slice(startIndex, endIndex);
    // const onPageChange = (page) => {
    //     setCurrentPage(page);
    // };
    const navigate = useNavigate()
    const handleProductDetails = (id) => {
        localStorage.setItem("idProduct", JSON.stringify(id));
        navigate("/productDetails");
    };

    return (
        <div>
            <div className="font-bold text-center mt-3 text-xl">Có <span className="text-[#b1c23c]"> {cart?.length} sản phẩm</span> trong giỏ hàng</div>
            <div className="flex max-w-[1300px] m-auto my-10">
                <div className="  p-auto mt-8 ">
                    <p className="text-3xl font-semibold rounded-lg w-80 h-10 ">
                        - Danh mục sản phẩm -
                    </p>
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="w-56 h-10 rounded-lg mt-2 cursor-pointer"
                        >
                            <p
                                className="w-56 text-2xl "
                                onClick={() => handleProducts(item.cateId)}
                            >
                                {item.nameCate}
                            </p>
                        </div>
                    ))}
                    {/* border-2 border-[#b1c23c] rounded-lg */}
                </div>
                <div className="grid grid-cols-3 gap-6 max-w-[900px] m-auto">
                    {listProduct
                        ?.filter(
                            (item) =>
                                selectedCategory === "all" ||
                                +item.cateId === selectedCategory
                        )
                        .map((item, index) => (
                            <div key={index} className=" p-6 mt-10">
                                <div onClick={() => handleProductDetails(item.id)}>
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="transition-transform transform hover:scale-110 duration-300 "
                                    />
                                </div>
                                <br />
                                <p className="text-center text-blue-900 text-lg font-semibold">
                                    {item.nameProduct}
                                </p>
                                <br />

                                <div className=" gap-2">
                                    <p className="text-center text-[#b1c23c] text-xl font-semibold">
                                        {VND.format(item.price)}
                                    </p>
                                    <br />
                                    <Button
                                        variant="contained"
                                        className="m-auto"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to card
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
            {/* <Pagination
                className="ml-[50%]"
                current={currentPage}
                onChange={onPageChange}
                pageSize={itemsPerPage}
                total={listProduct.length}
            /> */}
        </div>
    );
}
