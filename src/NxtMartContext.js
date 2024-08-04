import React, { createContext, useState } from 'react';


const defaultContext = {
  cartList: [],
  removeCartItem: () => {},
  addCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
};


const NxtMartContext = createContext(defaultContext);


export const NxtMartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const addCartItem = item => {
    setCartList(prevCartList => {
      const itemIndex = prevCartList.findIndex(cartItem => cartItem.id === item.id);
      if (itemIndex > -1) {
        const updatedCartList = [...prevCartList];
        updatedCartList[itemIndex].quantity = (updatedCartList[itemIndex].quantity || 0) + (item.quantity || 1);
        return updatedCartList;
      }
      return [...prevCartList, item];
    });
  };

  const removeCartItem = id => {
    setCartList(prevCartList => prevCartList.filter(item => item.id !== id));
  };

  const incrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
  };

  const decrementCartItemQuantity = id => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.id === id && (item.quantity || 0) > 1
          ? { ...item, quantity: (item.quantity || 0) - 1 }
          : item
      )
    );
  };

  return (
    <NxtMartContext.Provider
      value={{
        cartList,
        removeCartItem,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </NxtMartContext.Provider>
  );
};

export default NxtMartContext;

