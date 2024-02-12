import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BrowserRouter as Router, Link } from "react-router-dom";

const CarouselFavoriteCharacter = ({ arrImages }) => {
  console.log(arrImages);

  const Slide = ({ linkTo, image, alt }) => (
    <Link to={`/bio/${linkTo}`}>
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
          linkTo={`${element.imageId}/${element.name}/${
            element.description || "Pas de description"
          }`}
          image={element.imageUrl}
          alt={`slide-${index}`}
        />
      ))}
    </Slider>
  );
};

export default CarouselFavoriteCharacter;
