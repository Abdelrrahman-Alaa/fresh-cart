import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mt-8 py-12 flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
