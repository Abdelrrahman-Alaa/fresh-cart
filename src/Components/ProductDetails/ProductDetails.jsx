import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Laoding from "../Laoding/Laoding";
import { cartContext } from "../../Contexts/CartContext/CartContext";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { addProductToCart } = useContext(cartContext);
  let { id } = useParams();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, error, isError, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  /*  async function getProduct(productId) {
    try {
      let {
        data: { data },
      } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${productId}`
      );
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct(id);
  }, []); */

  return (
    <>
      {isLoading ? (
        <Laoding />
      ) : isError ? (
        <h2>{error.message}</h2>
      ) : (
        product && (
          <div className="flex flex-col md:flex-row items-center p-4 md:p-8 gap-4 md:gap-8">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <Slider {...settings}>
                {product.images.map((image, index) => {
                  return (
                    <img
                      className="w-full h-48 md:h-auto object-contain rounded"
                      key={index}
                      src={image}
                      alt=""
                    />
                  );
                })}
              </Slider>
            </div>
            <div className="w-full md:w-3/4 ps-0 md:ps-4">
              <h2 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                {product.title}
              </h2>
              <p className="m-2 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {product.description}
              </p>
              <p className="m-2 text-main dark:text-blue-300 text-sm md:text-base">
                {product.category.name}
              </p>
              <div className="flex m-2 justify-between items-center">
                <span className="text-base md:text-lg text-gray-900 dark:text-gray-100">
                  {product.price} EGP
                </span>
                <span className="flex items-center text-yellow-500 dark:text-yellow-400">
                  {product.ratingsAverage}
                  <i className="fas fa-star ml-1 rating-color"></i>
                </span>
              </div>
              <button
                onClick={() => {
                  addProductToCart(product.id);
                }}
                className="btn w-full mt-4 dark:bg-green-600 dark:text-white dark:hover:bg-green-700"
              >
                Add to cart
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}
