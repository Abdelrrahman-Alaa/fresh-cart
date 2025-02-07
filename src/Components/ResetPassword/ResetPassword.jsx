import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let nav = useNavigate();

  async function resetPassword(values) {
    setIsLoading(true);
    try {
      let res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );

      nav("/login");
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="w-1/3 mx-auto mt-24">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={handleChange}
            value={values.email}
            name="email"
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="example@example.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your new password
          </label>
          <input
            onChange={handleChange}
            value={values.newPassword}
            type="password"
            id="password"
            name="newPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            required
          />
        </div>
        {isLoading ? (
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="my-4 text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
           px-6 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <i className="fa-spin fa-spinner fas"></i>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" my-4 text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full 
           px-6 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        )}
      </form>
    </>
  );
}
