import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { cartContext } from "../../Contexts/CartContext/CartContext";
import { userTokenContext } from "../../Contexts/UserTokenContext/UserTokenContext";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function Checkout() {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { cart, getCartProducts } = useContext(cartContext);
  const { userToken } = useContext(userTokenContext);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const baseURL = window.location.origin;
  const handlePaymentSuccess = () => {
    // استخراج الـ base path تلقائيًا
    const basePath = `/${window.location.pathname.split("/")[1]}`;
    // بناء رابط التحويل الصحيح
    const redirectUrl = `${window.location.origin}${basePath}/#/allorders`;
    // تنفيذ إعادة التوجيه
    window.location.href = redirectUrl;
  };

  /*   async function handleCheckout(shippingAddress) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers: { token: userToken } }
      );

      location.href = data.session.url;
    } catch (error) {
      console.log(error);
      setErrMessage(error.response.data.message);
      setIsLoading(false);
    }
  } */

  async function handleCheckout(shippingAddress) {
    try {
      setIsLoading(true);

      if (paymentMethod === "cash") {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
          { shippingAddress },
          { headers: { token: userToken } }
        );
        getCartProducts();
        toast.success("Payment done successfully");
        formik.resetForm();
        handlePaymentSuccess();
      } else {
        let { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=${baseURL}/fresh-cart/#`,
          { shippingAddress },
          { headers: { token: userToken } }
        );
        formik.resetForm();
        console.log(data);

        location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
      setErrMessage(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    details: Yup.string().required("Details is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    validationSchema, // we can use one word if the property is the same of value
    onSubmit: handleCheckout,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto mt-24">
        {errMessage && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMessage}
          </div>
        )}

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        )}

        {/* City */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your city
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          />
        </div>
        {formik.errors.city && formik.touched.city && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.city}
          </div>
        )}

        {/* Details */}
        <div className="mb-5">
          <label
            htmlFor="details"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your details
          </label>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            id="details"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          />
        </div>
        {formik.errors.details && formik.touched.details && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.details}
          </div>
        )}

        {/* Cash or Visa */}

        <fieldset>
          <legend className="sr-only">Payment option</legend>
          <div className="flex items-center mb-4">
            <input
              id="payment-option-1"
              type="radio"
              name="payments"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 dark:focus:bg-green-600 dark:bg-gray-700 dark:border-gray-600"
              // defaultChecked
            />
            <label
              htmlFor="payment-option-1"
              className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Cash on delivery (COD)
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="payment-option-2"
              type="radio"
              name="payments"
              value="visa"
              checked={paymentMethod === "visa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 dark:focus:bg-green-600 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="payment-option-2"
              className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Credit/Debit Card
            </label>
          </div>
        </fieldset>

        {/* Remember Me */}
        <div className="flex items-center justify-between mb-5">
          <div className="">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                defaultValue
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
          </div>

          {/* Checkout */}
          {isLoading ? (
            <button
              type="button"
              className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
          sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fa-spin fa-spinner fas"></i>
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
          sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Checkout
            </button>
          )}
        </div>
      </form>
    </>
  );
}
