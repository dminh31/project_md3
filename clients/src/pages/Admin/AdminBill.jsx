import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminBill() {
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
                        <Link to={"/adminProduct"}><span className='text-2xl hover:text-pink-600 '>Quan li san pham</span></Link>
                    </li>

                    <li className="menu__item">
                        <Link to={"/adminBill"}><span className='text-2xl hover:text-pink-600 ' >Quan li don hang</span></Link>
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
                <div>

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
