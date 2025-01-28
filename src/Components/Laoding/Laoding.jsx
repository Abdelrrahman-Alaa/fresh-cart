import React, { useState } from "react";
import style from "./Laoding.module.css";
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function Laoding() {
  let [loading, setLoading] = useState(true);
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <MoonLoader
          color="#0aad0a"
          loading={loading}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
