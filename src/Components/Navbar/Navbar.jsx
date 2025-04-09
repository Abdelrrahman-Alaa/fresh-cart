import { useContext, useState } from "react";
import logoLight from "../../assets/images/freshcart-logo.svg";
import logoDark from "../../assets/images/freshcart-logo-dark.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userTokenContext } from "../../Contexts/UserTokenContext/UserTokenContext";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import { wishlistContext } from "../../Contexts/WishlistContext/WishlistContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useThemeContext } from "../../Contexts/ThemeContext/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken, setUserToken } = useContext(userTokenContext);
  const { cart } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);
  const { isDark } = useThemeContext();

  let nav = useNavigate();

  function logout() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    nav("/login");
  }

  return (
    <>
      <header className="bg-gray-200 dark:bg-gray-800 fixed inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-2 lg:px-8"
          aria-label="Global"
        >
          <Link to={""} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <img src={isDark ? logoDark : logoLight} width={120} alt="" />
          </Link>

          <div className="flex gap-x-2 lg:hidden">
            <ThemeToggle />
            <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300
 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          {userToken && (
            <div className="hidden lg:flex lg:gap-x-2 capitalize">
              <NavLink
                to={"/"}
                className=" font-medium text-gray-600 dark:text-gray-300"
              >
                home
              </NavLink>

              <NavLink
                to={"/brands"}
                className=" font-medium text-gray-600 dark:text-gray-300"
              >
                brands
              </NavLink>
              <NavLink
                to={"/categories"}
                className=" font-medium text-gray-600 dark:text-gray-300"
              >
                categories
              </NavLink>
              <NavLink
                to={"/products"}
                className=" font-medium text-gray-600 dark:text-gray-300"
              >
                products
              </NavLink>
            </div>
          )}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center  space-x-4">
            {userToken ? (
              <>
                {/* Wishlist Button */}
                <NavLink
                  to={"/wishlist"}
                  className=" font-medium text-gray-600 dark:text-gray-300"
                >
                  {wishlist?.count}
                  <i className="fa-regular fa-heart fa-lg mx-1"></i>
                  Wishlist
                </NavLink>

                {/* Cart Button */}
                <NavLink
                  to={"/cart"}
                  className=" font-medium  text-gray-600 dark:text-gray-300"
                >
                  {cart?.numOfCartItems}
                  <i className="fas fa-shopping-cart fa-lg mx-1"></i>
                  Cart
                </NavLink>

                {/* Theme Toggle */}
                <ThemeToggle />

                <a
                  onClick={logout}
                  className="hover:text-red-500 font-medium text-gray-600 dark:text-gray-300"
                >
                  Log Out
                </a>
              </>
            ) : (
              <>
                <ThemeToggle />

                <NavLink
                  to={"/register"}
                  className=" font-medium text-gray-600 dark:text-gray-300"
                >
                  Register
                </NavLink>
                <NavLink
                  to={"/login"}
                  className=" font-medium text-gray-600 dark:text-gray-300"
                >
                  Login <span aria-hidden="true">→</span>
                </NavLink>
              </>
            )}
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div
          className={isOpen ? "lg:hidden" : "hidden"}
          role="dialog"
          aria-modal="true"
        >
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900
 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex items-center justify-between">
              <NavLink to={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img src={isDark ? logoDark : logoLight} width={120} alt="" />
              </NavLink>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="-m-2.5  bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 text-center">
                {userToken && (
                  <div className="space-y-2 py-6 capitalize">
                    <NavLink
                      to={"/"}
                      onClick={() => setIsOpen(false)}
                      className=" block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300
 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      home
                    </NavLink>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={"/cart"}
                      className=" block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300
 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      cart
                    </NavLink>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={"/brands"}
                      className=" block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300
 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      brands
                    </NavLink>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={"/categories"}
                      className=" block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      categories
                    </NavLink>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to={"/products"}
                      className=" block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      products
                    </NavLink>
                  </div>
                )}
                <div className=" py-6">
                  {userToken ? (
                    <a
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className=" hover:text-red-500 block rounded-lg  text-base/7 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Log Out
                    </a>
                  ) : (
                    <>
                      <ThemeToggle />

                      <NavLink
                        onClick={() => setIsOpen(false)}
                        to={"/login"}
                        className=" block rounded-lg text-base/7 font-medium text-gray-600 dark:text-gray-300
 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Login <span aria-hidden="true">→</span>
                      </NavLink>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        to={"/register"}
                        className=" block rounded-lg text-base/7 font-medium text-gray-600 dark:text-gray-300
 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
