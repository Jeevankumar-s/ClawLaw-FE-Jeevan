import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';
import './index.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    const fetchOrders = async () => {
      try {
        const apiUrl = 'https://clawlaw-be-jeevan.onrender.com/orders/orders';
        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrdersList = () => (
    <ul className="orders-list">
      {orders.map(order => (
        <li key={order._id} className="order-item">
          <p>Order ID: {order._id}</p>
          <p>Items: {order.products.map(product => product.name).join(', ')}</p>
          <p>Total Amount: ₹{order.totalAmount}</p>
        </li>
      ))}
    </ul>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loader-container">
          <Oval color="#00BFFF" height={80} width={80} />
          <p>Your order is loading!!!</p>
        </div>
      );
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (orders.length === 0) {
      return <p>No orders found</p>;
    }

    return renderOrdersList();
  };

  return (
    <div>
      <Header />
      <div className="orders-container">
        <h1 className="orders-heading">Your Orders</h1>
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
