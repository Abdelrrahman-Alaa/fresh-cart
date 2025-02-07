import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswors() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let nav = useNavigate();

  async function submitEmail(values) {
    setIsLoading(true);
    try {
      let res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      nav("/verify-code");
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitEmail,
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto mt-24">
        {errorMsg && (
          <div
            className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMsg}
          </div>
        )}

        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Enter your email
        </label>
        <input
          onChange={handleChange}
          value={values.email}
          type="email"
          id="email"
          name="email"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="example@example.com"
        />
        {isLoading ? (
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="my-4 text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
          sm:w-auto px-6 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fa-spin fa-spinner fas"></i>
            </button>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We’ll never share your details. Read our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" my-4 text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
          sm:w-auto px-6 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
            <p
              id="helper-text-explanation"
              className="mt-2 text-sm text-gray-500 dark:text-gray-400"
            >
              We’ll never share your details. Read our{" "}
              <a
                href="#"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        )}
      </form>
    </>
  );
}
