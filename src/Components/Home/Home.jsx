import React, { useContext } from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
import Slider from "react-slick";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
