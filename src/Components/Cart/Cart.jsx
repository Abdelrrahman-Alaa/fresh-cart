import { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import Laoding from "../Laoding/Laoding";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, updateProductCount, deleteProduct } = useContext(cartContext);
  const nav = useNavigate();

  function handleCheckout() {
    if (!cart.numOfCartItems == 0) {
      nav("/checkout");
    } else {
      toast.error("The cart is empty");
    }
  }

  return (
    <>
      {cart ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-full px-1 sm:px-4">
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
                  Qty
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 sm:px-4 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-2 sm:p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain mx-auto"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900 dark:text-white max-w-[120px] sm:max-w-xs truncate">
                    {item.product.title}
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() =>
                          updateProductCount(item.product.id, item.count - 1)
                        }
                        className="inline-flex items-center justify-center p-1 text-xs sm:text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span className="text-center bg-gray-50 w-8 sm:w-14 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {item.count}
                      </span>
                      <button
                        onClick={() =>
                          updateProductCount(item.product.id, item.count + 1)
                        }
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2 font-semibold text-gray-900 dark:text-white">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <button
                      onClick={() => deleteProduct(item.product.id)}
                      className="font-medium bg-transparent hover:bg-transparent text-red-600 dark:text-red-500 hover:underline focus:ring-1 focus:ring-red-700"
                    >
                      Remove
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
                <td className="py-3">{cart.data.totalCartPrice} EGP</td>
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
