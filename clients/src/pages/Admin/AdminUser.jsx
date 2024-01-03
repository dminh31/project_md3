import React, { useEffect, useState } from 'react'
import publicAxios from '../../config/publicAxios'
import privateAxios from '../../config/privateAxios'
import { Link } from 'react-router-dom'

export default function AdminUser() {
  const [users, setUsers] = useState([])
  const handleGetUsers = async () => {
    try {
      const res = await privateAxios.get("/api/users")
      setUsers(res.data.users)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetUsers()
  }, [])
  const handleChangeStatus = async (user_id) => {
    try {
      const response = await publicAxios.patch(`/api/user/${user_id}`);
      setUsers(response.data.users)
    } catch (error) {
      console.log(error)
    }
  }
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
        {/* <div>
          {users.map((user, index) => {
            return <div key={index}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.status == 0 ? "active" : "unactive"}</p>
              <button onClick={() => handleChangeStatus(user.userId)}>{user.status == 0 ? "Khoa" : "Mo Khoa"}</button>
            </div>
          })}
        </div> */}

        <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
          <div className="card-header">
            <h5 className="mb-0 title ">Danh Sách Người Dùng</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-nowrap">
              <thead className="thead-light ">
                <tr>
                  <th scope="col">Stt</th>
                  <th scope="col">Tên </th>
                  <th scope="col">Email</th>
                  <th scope="col">Trang thai</th>
                  <th scope="col">Chuc nang</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.status == 0 ? "Mo Khoa" : "Khoa"}
                      </td>
                      <td><button onClick={() => handleChangeStatus(user.userId)}>{user.status == 0 ? "Khoa" : "Mo Khoa"}</button></td>
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
