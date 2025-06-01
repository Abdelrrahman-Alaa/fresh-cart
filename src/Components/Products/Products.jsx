import { useContext } from "react";
import { Link } from "react-router-dom";
import Laoding from "../Laoding/Laoding";
import useProducts from "../../Hooks/useProducts";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import { wishlistContext } from "../../Contexts/WishlistContext/WishlistContext";

export default function Products() {
  let { data, isLoading } = useProducts();
  const { addProductToCart } = useContext(cartContext);
  const { addProductToWishlist } = useContext(wishlistContext);

  return (
    <>
      {isLoading ? (
        <Laoding />
      ) : (
        <div className="flex flex-wrap py-8 gap-4 justify-center">
          {data.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 flex"
            >
              <div className="product flex flex-col justify-between w-full p-2 rounded dark:bg-gray-900 bg-white shadow-sm h-full">
                <Link
                  to={`/productdetails/${product.id}`}
                  className="flex flex-col h-full"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="rounded w-full h-40 sm:h-48 md:h-40 lg:h-44 xl:h-48 object-contain mb-2 bg-gray-50 dark:bg-gray-800"
                  />
                  <h4 className="text-main text-sm dark:text-yellow-400 truncate">
                    {product.category.name}
                  </h4>
                  <h4 className="text-xl text-black dark:text-white truncate mb-1">
                    {product.title.split(" ", 2).join(" ")}
                  </h4>
                  <div className="flex mt-2 justify-between text-gray-800 dark:text-gray-300 text-sm md:text-base">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star mr-2 rating-color"></i>
                    </span>
                  </div>
                </Link>
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    onClick={() => {
                      addProductToCart(product.id);
                    }}
                    className="btn w-full bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-400 dark:bg-green-700 dark:text-white dark:hover:bg-green-800 dark:focus:ring-green-500 transition-colors"
                  >
                    <i className="fas fa-cart-plus mr-2"></i> Add to cart
                  </button>
                  <button
                    onClick={() => {
                      addProductToWishlist(product.id);
                    }}
                    className="btn w-full bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 dark:bg-red-700 dark:text-white dark:hover:bg-red-800 dark:focus:ring-red-500 transition-colors"
                  >
                    <i className="fa-regular fa-heart fa-lg mr-2"></i> Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
