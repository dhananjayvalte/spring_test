import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider(props) {
  const [cartData, setCartData] = useState([]);
  const addToCartHandler = (data) => {
    const productData = { ...data, cart_quantity: 1 };
    setCartData((prev) => [...prev, productData]);
  };
  const removeFromCartHandler = (data) => {
    const checkIsInCart = cartData.filter((crd) => crd.id != data.id);

    setCartData(checkIsInCart);
  };

  const updataQuantityHanlder = (quantity, id) => {
    console.log("quantity", quantity);
    console.log("id", id);

    const listArr = [];
    for (let i = 0; i < cartData.length; i++) {
      const pd = cartData[i];
      if (id == pd.id) {
        const qty = pd.cart_quantity + quantity;
        const upd = { ...pd, cart_quantity: qty };
        console.log("upd", upd);
        listArr.push(upd);
      } else {
        console.log("pd", pd);
        listArr.push(pd);
      }
    }
    setCartData(listArr);
  };

  let data = {
    cartData,
    addToCart: (data) => addToCartHandler(data),
    removeFromCart: (data) => removeFromCartHandler(data),
    updataQuantity: (quantity, id) => updataQuantityHanlder(quantity, id),
  };

  return (
    <CartContext.Provider value={data}>{props.children}</CartContext.Provider>
  );
}
