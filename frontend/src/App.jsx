
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
import Orders from './Components/Orders'
import PrivateRoute from './Components/PrivateRoute'
import Register from './Components/auth/Register'
import Checkout from './Checkout/Checkout'

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
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/' element={<PrivateRoute  publicPage/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />   
          </Route>
        </Routes>
      </Router>
      <Toaster position='bottom-center' />
    </React.Fragment>
  )
}

export default App
