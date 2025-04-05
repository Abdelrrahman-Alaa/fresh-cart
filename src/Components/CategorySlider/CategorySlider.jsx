import Slider from "react-slick";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";
import React from "react";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  /*   const [categories, setCategories] = useState([]);

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
 */

  let { data } = useCategories();

  return (
    <>
      <Link>
        <Slider {...settings}>
          {data?.map((category) => {
            return (
              <React.Fragment key={category._id}>
                <img
                  className="w-full h-56 object-contain md:object-cover object-top"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="text-center m-2">{category.name}</h3>
              </React.Fragment>
            );
          })}
        </Slider>
      </Link>
    </>
  );
}
