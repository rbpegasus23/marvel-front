import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Carousel = ({ arrImages }) => {
  console.log(arrImages);

  const Slide = ({ linkTo, image, alt }) => (
    <Link to={`/comic/${linkTo}`}>
      <div>
        <img src={image} alt={alt} />
      </div>
    </Link>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "38%",
    // variableWidth: true,
  };

  return (
    <Slider {...settings}>
      {arrImages.map((element, index) => (
        <Slide
          key={index}
          linkTo={element.id}
          image={element.image}
          alt={`slide-${index}`}
        />
      ))}
    </Slider>
  );
};

export default Carousel;
