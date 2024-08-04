import { IoIosArrowForward } from 'react-icons/io';
import ProductItem from '../ProductItem';
import './index.css';

const ProductContainer = ({ productDetails, selectedCategory }) => {
  const { categoryName, products } = productDetails;
  console.log('Category:', categoryName);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'All' || selectedCategory === categoryName
    ? products
    : [];

  return (
    <div className="container">
      {filteredProducts.length > 0 && (
        <>
          <div className="product-heading-container">
            <h1 className="product-header">
              {categoryName} <IoIosArrowForward size={20} />
            </h1>
          </div>
          <ul className="product-item-container">
            {filteredProducts.map(product => (
              <ProductItem product={product} key={product.id} category={categoryName} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductContainer;
