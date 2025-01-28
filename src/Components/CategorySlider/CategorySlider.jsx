import React, { useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [categories, setCategories] = useState([]);
  async function getCategories() {
    try {
      let {
        data: { data },
      } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {categories.map((category, index) => {
          return (
            <>
              <img
                className="w-full h-56 object-cover object-top"
                key={index}
                src={category.image}
                alt={category.name}
              />
              <h3 className="text-center m-2">{category.name}</h3>
            </>
          );
        })}
      </Slider>
    </>
  );
}
