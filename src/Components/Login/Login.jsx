import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { userTokenContext } from "../../Contexts/UserTokenContext/UserTokenContext";

export default function Login() {
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let nav = useNavigate();
  let { setUserToken } = useContext(userTokenContext);

  async function handleLogin(values) {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
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

  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema, // we can use one word if the property is the same of value
      onSubmit: handleLogin,
    });

  console.log(document.getElementById("root"));

  return (
    <>
      <h2 className="dark:text-gray-100 text-center my-8">Login</h2>

      {/* Demo Credentials Card */}
      <div className="max-w-md mx-auto mb-8">
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl shadow-md bg-green-50 border border-green-200 dark:bg-gray-800 dark:border-green-700">
          <div className="text-3xl text-green-600 dark:text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v10.5A2.25 2.25 0 009.75 19.5h4.5a2.25 2.25 0 002.25-2.25V13.5m-6-3h7.5m0 0l-2.25-2.25M17.25 10.5l-2.25 2.25"
              />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-green-700 dark:text-green-300 mb-1 flex items-center gap-1">
              <span>Demo Login</span>
              <span className="text-base">🔑</span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-200">
              <span className="font-medium">Email:</span> demo_test@demo.com
              <br />
              <span className="font-medium">Password:</span> Test@123
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-12">
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            type="email"
            id="email"
            name="email"
            // autoComplete="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
            placeholder="example@example.com"
          />
        </div>
        {errors.email && touched.email && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.email}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            type="password"
            id="password"
            name="password"
            // autoComplete="new-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
          />
        </div>
        {errors.password && touched.password && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errors.password}
          </div>
        )}

        <div className="hover:underline my-2 dark:text-gray-100">
          <Link to={"/forget-password"}>Forget password?</Link>
        </div>
        {isLoading ? (
          <button
            type="button"
            className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
           px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <i className="fa-spin fa-spinner fas"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
           px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Login
          </button>
        )}
      </form>
    </>
  );
}
