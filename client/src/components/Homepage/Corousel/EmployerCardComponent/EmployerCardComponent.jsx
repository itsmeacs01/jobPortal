import React from "react";
import Slider from "react-slick";
import { withSize } from "react-sizeme";

import "./EmployerCardComponent.scss";
import image from "./../companyImg/lycs-architecture-U2BI3GMnSSE-unsplash.jpg";

const employers = [
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  },
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  },
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  },
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  },
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  },
  {
    image: "#",
    title: "CodeBolt Alt",
    location: "34E 81st St, NewYork",
    numJobs: 2
  }
];

const EmployerCardComponent = ({ size }) => {
  const findSlidesNumber = () => {
    if (size.width < 800 && size.width > 600) {
      return 2;
    } else if (size.width < 600) {
      return 1;
    }
    return 3;
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: findSlidesNumber(),
    slidesToScroll: findSlidesNumber(),
    autoplay: true,
    arrows: true
  };

  return (
    <div className="slider">
      <Slider {...settings}>
        {employers.map((employer, i) => {
          return (
            <div key={i}>
              <div className="employer-card">
                <img className="employer-card__img" src={image} alt="logo" />
                <h3 className="employer-card__title">{employer.title}</h3>
                <p className="employer-card__location">{employer.location}</p>
                <a href="#" className="employer-card__number">
                  {employer.numJobs} Jobs
                </a>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default withSize()(EmployerCardComponent);
