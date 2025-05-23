import logoLight from "../../assets/images/freshcart-logo.svg";
import logoDark from "../../assets/images/freshcart-logo-dark.svg";
import { useThemeContext } from "../../Contexts/ThemeContext/ThemeContext";

export default function Footer() {
  const { isDark } = useThemeContext();

  return (
    <>
      <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4 mb-0">
        <div className="w-full  mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src={isDark ? logoDark : logoLight}
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </a>
            <ul className="flex gap-2 flex-col sm:flex-row flex-wrap items-center mb-6  text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Freshcart™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
