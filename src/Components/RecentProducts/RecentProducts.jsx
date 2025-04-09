import { useContext } from "react";
import { Link } from "react-router-dom";
import Laoding from "../Laoding/Laoding";
import useProducts from "../../Hooks/useProducts";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import { wishlistContext } from "../../Contexts/WishlistContext/WishlistContext";

export default function RecentProducts() {
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
              className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
            >
              <div className="product p-2 rounded dark:bg-gray-900">
                <Link to={`productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="rounded"
                  />
                  <h4 className="text-main text-sm dark:text-yellow-400">
                    {product.category.name}
                  </h4>
                  <h4 className="text-xl text-black dark:text-white">
                    {product.title.split(" ", 2).join(" ")}
                  </h4>
                  <div className="flex mt-2 justify-between text-gray-800 dark:text-gray-300">
                    <span>{product.price} EGP</span>
                    <span>
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star mr-2 rating-color"></i>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    addProductToCart(product.id);
                  }}
                  className="btn w-full"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => {
                    addProductToWishlist(product.id);
                  }}
                  className="btn w-full  bg-red-500 hover:bg-red-600  focus:ring-red-700"
                >
                  Wishlist <i className="fa-regular fa-heart fa-lg"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
