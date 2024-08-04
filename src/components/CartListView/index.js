import { useContext } from 'react';
import CartItem from '../CartItem';
import NxtMartContext from '../../NxtMartContext';

import './index.css';

const CartListView = () => {
  const { cartList } = useContext(NxtMartContext);

  return (
    <ul className="cart-list">
      {cartList.length === 0 ? (
        <li className="empty-cart-message">Your cart is empty</li>
      ) : (
        cartList.map(cartItem => (
          <CartItem key={cartItem.id} cartItemDetails={cartItem} />
        ))
      )}
    </ul>
  );
};

export default CartListView;
