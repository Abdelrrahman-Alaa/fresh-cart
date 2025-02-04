import React from "react";
import style from "./Brands.module.css";
import useBrands from "../../Hooks/useBrands";
import Laoding from "../Laoding/Laoding";

export default function Brands() {
  let { data, isLoading } = useBrands();

  return (
    <>
      {isLoading ? (
        <Laoding />
      ) : (
        <div className="flex flex-wrap justify-center ">
          {data?.map((brand) => {
            return (
              <div className="w-1/3 p-6" key={brand._id}>
                <a
                  href="#"
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-contain w-full rounded-t-lg h-96 md:h-48 md:w-48 md:rounded-none md:rounded-s-lg"
                    src={brand.image}
                    alt
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {brand.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
