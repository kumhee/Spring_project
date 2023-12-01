import React from 'react'
import NaviPage from './NaviPage'
import SearchPage from './shop/SearchPage'
import { Route, Routes } from 'react-router-dom'
import ShopList from './shop/ShopList'
import ShopUpdate from './shop/ShopUpdate'
import LoginPage from './user/LoginPage'
import HomePage from './HomePage'
import ShopInfo from './shop/ShopInfo'
import ReviewPage from './shop/ReviewPage'
import CartList from './shop/CartList'
import OrderPage from './shop/OrderPage'
import MyPage from './user/MyPage'
import OrderComplete from './order/OrderComplete'
import OrderList from './order/OrderList'
import ContentPage from './shop/ContentPage'

const HeaderPage = () => {
  return (
    <>
      <div className='wrap'>
        <NaviPage />
        <img src='/images/header.png' alt="header" width="100%" />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/shop/search" element={<SearchPage />} />
        <Route path="/shop/list" element={<ShopList />} />
        <Route path="/shop/update/:pid" element={<ShopUpdate />} />
        <Route path="/shop/info/:pid" element={<ShopInfo />} />
        <Route path="/shop/review/:pid" element={<ReviewPage />} />
        <Route path="/cart/list" element={<CartList />} />
        <Route path="/cart/order" element={<OrderPage />} />

        <Route path="/order/complete/:oid" element={<OrderComplete />} />
        <Route path="/order/list" element={<OrderList />} />

        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/mypage" element={<MyPage />} />
      </Routes>
    </>
  )
}

export default HeaderPage