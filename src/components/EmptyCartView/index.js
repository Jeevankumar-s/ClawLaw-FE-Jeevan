import { Link } from 'react-router-dom';
import './index.css';

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://i.postimg.cc/yxx8SGm3/Logo.png"
      alt="Empty Cart"
      className="cart-empty-img"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
    <Link to="/">
      <button type="button" className="shop-now-btn">
        Shop Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;
