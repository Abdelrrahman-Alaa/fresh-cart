
import { useContext } from "react";
import { wishlistContext } from "../../Contexts/WishlistContext/WishlistContext";
import Laoding from "../Laoding/Laoding";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlist, deleteProduct } = useContext(wishlistContext);
  const { addProductToCart, cart } = useContext(cartContext);
  const nav = useNavigate();

  // Calculate products total price
  const totalPrice = wishlist?.data.reduce((acc, item) => acc + item.price, 0);

  function handleCheckout() {
    if (!cart.numOfCartItems == 0) {
      nav("/checkout");
    } else {
      toast.error("The cart is empty");
    }
  }

  return (
    <>
      {wishlist ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 max-w-full px-1 sm:px-4">
          <table className="min-w-[400px] w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Product
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Qty in stock
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Delete
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Add
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-2 sm:p-4">
                    <img
                      src={item.imageCover}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain mx-auto"
                      alt={item.title}
                    />
                  </td>
                  <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900 dark:text-white max-w-[120px] sm:max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <span className="text-center bg-gray-50 w-8 sm:w-14 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    {item.price} EGP
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="font-medium bg-transparent hover:bg-transparent text-red-600 dark:text-red-500 hover:underline focus:ring-1 focus:ring-red-700"
                    >
                      Remove
                    </button>
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <button
                      onClick={() => addProductToCart(item.id)}
                      className="font-medium bg-transparent hover:bg-transparent text-green-600 dark:text-green-500 hover:underline"
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-base sm:text-xl text-gray-900 dark:text-white">
                <th scope="row" className="px-2 sm:px-6 py-4 sm:py-8 ">
                  Total
                </th>
                <td className="px-2 sm:px-6 py-3"></td>
                <td className="px-2 sm:px-6 py-3"></td>
                <td className="py-3">{totalPrice} EGP</td>
                <td className="px-2 sm:px-6 py-3"></td>
                <td className="px-2 sm:px-6 py-3">
                  <Link onClick={handleCheckout}>
                    <button
                      type="button"
                      className="font-normal text-base sm:text-lg "
                    >
                      Checkout
                    </button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <Laoding />
      )}
    </>
  );
}
