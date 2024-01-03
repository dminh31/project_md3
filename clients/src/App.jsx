import React from 'react'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminProduct from './pages/Admin/AdminProduct'
import { Outlet, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import AdminCate from './pages/Admin/AdminCate'
import AdminUser from './pages/Admin/AdminUser'
import Cart from './pages/Cart/Cart'
import Bill from './pages/Bill/Bill'
import AdminBill from './pages/Admin/AdminBill'
import Product from './pages/Product/Product'

export default function App() {
  return (
    <body>
      <Routes>
        <Route path='/' element={<><Header /> <Outlet /> <Footer /></>}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/bill' element={<Bill />}></Route>
        </Route>

        <Route path='/adminProduct' element={<AdminProduct />}></Route>
        <Route path='/adminCate' element={<AdminCate />}></Route>
        <Route path='/adminUser' element={<AdminUser />}></Route>
        <Route path='/adminBill' element={<AdminBill />}></Route>

        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </body>
  )
}
