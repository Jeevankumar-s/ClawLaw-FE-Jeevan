import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiLogout } from 'react-icons/ci';
import { AiFillHome, AiFillAlipaySquare, AiFillProfile } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa";

import { FaUserShield } from 'react-icons/fa';
import './index.css';

const Header = () => {
  const navigate = useNavigate();
  const role = Cookies.get('role');

  const clickToLogOut = () => {
    Cookies.remove('jwt_token');
    Cookies.remove('role');
    navigate('/login');
  };

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
      <ul className="header-content">
        {role === 'admin' && (
          <li>
            <Link to="/add-product" className="link-item">
              <button className="list-item">
                <FaUserShield className="icon" /> Add Product
              </button>
            </Link>
          </li>
        )}
        <li>
          <Link to="/" className="link-item">
            <button className="list-item">
              <AiFillHome className="icon" /> Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link-item">
            <button className="list-item">
              <FaShoppingCart className="icon" /> Cart
            </button>
          </Link>
        </li>
        <li>
          <Link to="/orders" className="link-item">
            <button className="list-item">
              <AiFillProfile className="icon" /> Orders
            </button>
          </Link>
        </li>
        <li>
          <button className="logout-button" onClick={clickToLogOut}>
            <CiLogout className="icon" size={20} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
