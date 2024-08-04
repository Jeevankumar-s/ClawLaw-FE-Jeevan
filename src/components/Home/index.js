import { useState, useEffect, useCallback } from 'react';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import Header from '../Header';
import SideBar from '../SideBar';
import ProductContainer from '../ProductContainer';
import Footer from '../Footer';
import './index.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getProducts = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = 'https://clawlaw-be-jeevan.onrender.com/products/';
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);
      const dataa = await response.json();
      const data = dataa[0];

      if (response.ok) {
        const fetchedData = data.categories.map(category => ({
          categoryName: category.name,
          products: category.products.map(product => ({
            id: product.id,
            name: product.name,
            weight: product.weight,
            price: product.price,
            image: product.image,
          })),
        }));
        setProductList(fetchedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleActiveCategory = categoryName => {
    setSelectedCategory(categoryName);
  };

  const renderSuccessView = () => (
    <div className="success-container">
      <div>
        <ul className="sidebar-maincontainer">
          <h1 className="sidebar-heading">Categories</h1>
          <p
            className={selectedCategory === 'All' ? 'isActive' : 'sidebar-category'}
            onClick={() => handleActiveCategory('All')}
          >
            All
          </p>
          {productList.map(eachList => (
            <SideBar
              eachList={eachList}
              key={eachList.categoryName}
              handleActiveCategory={handleActiveCategory}
              isActive={selectedCategory === eachList.categoryName}
            />
          ))}
        </ul>
      </div>
      <div className="productList-container">
        {productList.map(productDetails => (
          <ProductContainer
            productDetails={productDetails}
            key={productDetails.categoryName}
            selectedCategory={selectedCategory}
          />
        ))}
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://i.postimg.cc/Y2NH70xS/Frame-12236.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We are having some trouble</p>
      <button type="button" onClick={getProducts}>
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Oval type="ThreeDots" color="#339722" height={50} width={50} />
    </div>
  );

  const renderProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      {renderProducts()}
      <Footer />
    </div>
  );
};

export default Home;
