import Slider from "react-slick";
import useCategories from "../../Hooks/useCategories";
import { Link } from "react-router-dom";

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

  let { data } = useCategories();

  return (
    <div className="py-6 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Slider {...settings}>
        {data?.map((category) => (
          <div key={category._id} className="px-2">
            <Link to={`/categories/${category._id}`}>
              <div className="rounded overflow-hidden shadow-md dark:shadow-lg bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
                <img
                  className="w-full h-56 object-contain md:object-cover object-top"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="text-center m-2 text-gray-800 dark:text-white text-lg font-medium">
                  {category.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
