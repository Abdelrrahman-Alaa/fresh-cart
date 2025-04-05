import Slider from "react-slick";
import banner1 from "../../assets/images/grocery-banner-edit.png";
import banner2 from "../../assets/images/grocery-banner-2-edit.jpeg";
import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import { Link } from "react-router-dom";

export default function MainSlider() {
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
  return (
    <>
      <Link className="flex my-4">
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img
              className="w-full object-cover h-[150px] md:h-[300px]"
              src={slider1}
              alt={"slider1"}
            />
            <img
              className="w-full object-cover  h-[150px] md:h-[300px]"
              src={slider2}
              alt={"slider2"}
            />
            <img
              className="w-full object-cover h-[150px] md:h-[300px]"
              src={slider3}
              alt={"slider3"}
            />
          </Slider>
        </div>
        <div className="hidden md:w-1/4 md:block">
          <img
            className="h-[150px] object-cover w-full"
            src={banner1}
            alt="grocery banner 1"
          />
          <img
            className="h-[150px] object-cover w-full"
            src={banner2}
            alt="grocery banner 1"
          />
        </div>
      </Link>
    </>
  );
}
