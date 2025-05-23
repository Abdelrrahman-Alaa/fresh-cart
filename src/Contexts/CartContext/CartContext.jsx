import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userTokenContext } from "../UserTokenContext/UserTokenContext";

export let cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const { userToken } = useContext(userTokenContext);
  const headers = {
    token: userToken,
  };

  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: productId,
        },
        { headers: headers }
      );
      // console.log(data);
      getCartProducts();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  async function updateProductCount(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        { headers: headers }
      );
      console.log(data);
      setCart(data);
      toast.success(data.status);
    } catch (error) {
      console.log(error);
      toast.error(error.status);
    }
  }

  async function deleteProduct(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: headers }
      );
      // console.log(data);
      setCart(data);
      toast.success(data.status);
    } catch (error) {
      console.log(error);
      toast.error(error.status);
    }
  }

  async function getCartProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { headers: headers }
      );
      // console.log(data);
      setCart(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Getting cart products when open &nlogin

  useEffect(() => {
    if (userToken) {
      getCartProducts();
    }
  }, [userToken]);

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        addProductToCart,
        updateProductCount,
        deleteProduct,
        getCartProducts,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
