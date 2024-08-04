import { useContext } from 'react';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

import NxtMartContext from '../../NxtMartContext';

import './index.css';

const CartItem = ({ cartItemDetails }) => {
  
  const { removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity } = useContext(NxtMartContext);
  console.log(cartItemDetails);
  const { id, name, quantity, price, image, weight } = cartItemDetails;
  const numericPrice = parseFloat(price.slice(1));

  const onRemoveCartItem = () => {
    removeCartItem(id);
  };

  const onClickIncrement = () => {
    incrementCartItemQuantity(id);
  };

  const onClickDecrement = () => {
    decrementCartItemQuantity(id);
  };

  return (
    <li className="cart-item" data-testid="cartItem">
      <img className="cart-product-image" src={image} alt={name} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{name}</p>
          <p className="cart-product-title" data-testid="item-quantity">
            Quantity: {quantity}
          </p>
          <p className="cart-product-brand">{weight}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickDecrement}
            data-testid="decrement-quantity"
            aria-label="Decrease quantity"
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity" data-testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={onClickIncrement}
            data-testid="increment-quantity"
            aria-label="Increase quantity"
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {numericPrice * quantity}/-</p>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove button"
        aria-label="Remove item"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
