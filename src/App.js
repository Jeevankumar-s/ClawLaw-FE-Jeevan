import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginRoute from './components/LoginRoute';
import RegisterRoute from './components/RegisterRoute';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';
import Orders from './components/Orders'
import { NxtMartProvider } from './NxtMartContext';
import './App.css';

const getLocalCartData = () => {
  const localCartData = localStorage.getItem('cartData');
  if (localCartData === null) {
    return [];
  }
  return JSON.parse(localCartData);
};

const App = () => {
  const [cartList, setCartList] = useState(getLocalCartData());

  const addCartItem = product => {
    setCartList(prevCartList => {
      const newCartList = prevCartList || [];
      const existingItem = newCartList.find(item => item.id === product.id);
      if (existingItem) {
        const updatedCartList = newCartList.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        localStorage.setItem('cartData', JSON.stringify(updatedCartList));
        return updatedCartList;
      }
      const updatedCartList = [...newCartList, product];
      localStorage.setItem('cartData', JSON.stringify(updatedCartList));
      return updatedCartList;
    });
  };

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeCartItem = id => {
    setCartList(prevCartList =>
      prevCartList.filter(item => item.id !== id)
    );
  };

  return (
    <NxtMartProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />
          <Route path="/add-product" element={<Admin />} />
          <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          </Route>
          <Route path="/cart" element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />

          </Route>
          <Route path="/Orders" element={<ProtectedRoute />}>
            <Route path="/Orders" element={<Orders />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </NxtMartProvider>
  );
};

export default App;
