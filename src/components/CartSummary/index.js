import { useContext } from 'react';
import { MdCurrencyRupee } from 'react-icons/md';
import Cookies from 'js-cookie';

import NxtMartContext from '../../NxtMartContext';

import './index.css';

const CartSummary = ({ onCheckout }) => {
  const { cartList } = useContext(NxtMartContext);

  const totalQuantity = cartList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartList.reduce(
    (total, item) =>
      total + parseFloat(item.price.slice(1)) * item.quantity,
    0
  );

  const handleCartFunction = async () => {
    const jwtToken = Cookies.get('jwt_token');

    try {
        const response = await fetch('https://clawlaw-be-jeevan.onrender.com/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({ products: cartList }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Order posted successfully:', data);

        localStorage.removeItem('cartData');
        // setCartList([]);
        onCheckout();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};


  return (
    <div className="summary-container">
      <div className="summary-content">
        <h1 data-testid="total-price" className="summary-details">
          Total ({totalQuantity} items):
        </h1>
        <p data-testid="total-price" className="summary-details">
          <MdCurrencyRupee /> {totalPrice}
        </p>
      </div>
      <button
        type="button"
        className="checkout-btn"
        onClick={handleCartFunction}
      >
        CheckOut
      </button>
    </div>
  );
};

export default CartSummary;
