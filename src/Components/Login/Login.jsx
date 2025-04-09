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
      <h2 className="dark:text-gray-100 text-center my-12">Login</h2>

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
