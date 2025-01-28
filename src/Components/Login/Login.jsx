import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userTokenContext } from "../../Contexts/UserTokenContext/UserTokenContext";

export default function Login() {
  const [errMessage, setErrMessage] = useState("");
  const [isLoding, setIsLoding] = useState(false);
  let nav = useNavigate();
  let { setUserToken } = useContext(userTokenContext);

  async function handleLogin(values) {
    try {
      setIsLoding(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      nav("/");
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
    } catch (error) {
      console.log(error);
      setErrMessage(error.response.data.message);
      setIsLoding(false);
    }
  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Name is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Invalid password"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema, // we can use one word if the property is the same of value
    onSubmit: handleLogin,
  });

  return (
    <>
      <h2>Login</h2>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto">
        {errMessage && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMessage}
          </div>
        )}

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            id="email"
            autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
            placeholder="example@example.com"
          />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            id="password"
            autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        )}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              defaultValue
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        {isLoding ? (
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
            Login
          </button>
        )}
      </form>
    </>
  );
}
