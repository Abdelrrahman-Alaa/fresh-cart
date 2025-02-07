import React from "react";
import RecentProducts from "../RecentProducts/RecentProducts";
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
