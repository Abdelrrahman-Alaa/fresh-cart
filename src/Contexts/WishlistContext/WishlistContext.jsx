import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let wishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const headers = { token: localStorage.getItem("userToken") };

  function isInWishlist(productId) {
    return wishlist?.data.some((item) => item.id === productId);
  }

  // Adding product to wishlist
  async function addProductToWishlist(productId) {
    // Checking if the item in the wishlist or not
    if (isInWishlist(productId)) {
      toast.error("Item already exist");
      return;
    }

    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: productId,
        },
        { headers: headers }
      );

      getWishlistProducts();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Getting wishlist products
  async function getWishlistProducts() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: headers }
      );
      setWishlist(data);
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Deleting wishlist product
  async function deleteProduct(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers }
      );
      getWishlistProducts();
      toast.success(data.status);
    } catch (error) {
      toast.error(error.status);
    }
  }

  // Getting wishlist products when open
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlistProducts();
    }
  }, []);

  return (
    <>
      <wishlistContext.Provider
        value={{
          wishlist,
          setWishlist,
          addProductToWishlist,
          deleteProduct,
          getWishlistProducts,
        }}
      >
        {children}
      </wishlistContext.Provider>
      ;
    </>
  );
}
