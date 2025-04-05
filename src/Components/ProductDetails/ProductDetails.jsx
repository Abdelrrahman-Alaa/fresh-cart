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
          <div className="flex items-center p-8 gap-8 ">
            <div className="w-1/4">
              <Slider {...settings}>
                {product.images.map((image, index) => {
                  return (
                    <img className="w-full" key={index} src={image} alt="" />
                  );
                })}
              </Slider>
            </div>
            <div className="w-3/4 ps-4">
              <h2>{product.title}</h2>
              <p className="m-2  text-gray-600">{product.description}</p>
              <p className="m-2 text-main">{product.category.name}</p>
              <div className="flex m-2 justify-between ">
                <span>{product.price} EGP</span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fas fa-star mr-2 rating-color "></i>
                </span>
              </div>
              <button
                onClick={() => {
                  addProductToCart(product.id);
                }}
                className="btn w-full"
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
