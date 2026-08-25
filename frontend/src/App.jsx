
import './App.css'
import React from 'react'
import Products from './Components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home'
import Navbar from './Components/shared/Navbar'
import About from './Components/About'
import Contact from './Components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/cart/Cart'
import Login from './Components/auth/Login'
import Profile from './Components/Profile'
import AdminOrders from './Components/Admin/Orders/Order'
import Orders from './Components/Orders'
import PrivateRoute from './Components/PrivateRoute'
import Register from './Components/auth/Register'
import Checkout from './Checkout/Checkout'
import PaymentConfirmation from './Checkout/PaymentConfirmation'
import AdminLayout from './Components/Admin/AdminLayout'
import Dashboard from './Components/Admin/Dashboard/Dashboard'
import AdminProducts from './Components/Admin/Products/AdminProducts'
import Category from './Components/Admin/Categories/Category'
import Seller from './Components/Admin/Sellers/Seller'
import SellerDashboard from './Components/Seller/Dashboard/SellerDashboard'
import SellerProducts from './Components/Seller/Products/SellerProducts'
import SellerOrders from './Components/Seller/Orders/SellerOrders'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/' element={<PrivateRoute/>}>
             <Route path='/checkout' element={<Checkout/>}/>
             <Route path='/order-confirm' element={<PaymentConfirmation/>} />
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/' element={<PrivateRoute  publicPage/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />   
          </Route>

          <Route path='/' element={<PrivateRoute  adminOnly />}>
            <Route path='/admin' element={<AdminLayout/>}>
              <Route path='' element={<Dashboard/>}/>
              <Route path='order'  element={<AdminOrders/>} />
              <Route  path='products' element={<AdminProducts/>} />
              <Route path='categories' element={<Category/>} />
              <Route  path='sellers' element={<Seller/>} />

            </Route>

          </Route>

          <Route path='/' element={<PrivateRoute sellerOnly />}>
            <Route path='/seller' element={<AdminLayout panelType="seller" />}>
              <Route path='' element={<SellerDashboard />} />
              <Route path='products' element={<SellerProducts />} />
              <Route path='orders' element={<SellerOrders />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App
