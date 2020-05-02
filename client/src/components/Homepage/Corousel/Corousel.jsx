import React from "react";

import "./Corousel.scss";
import EmployerCardComponent from "./EmployerCardComponent/EmployerCardComponent";

const Corousel = () => {
  return (
    <div className="corousel">
      <div className="text">
        <h2 className="text__heading">
          <b>Latest Employeers</b>
        </h2>
        <p className="text__description">
          Each Month, More Than 7 Million Jobhunt Turn To Website In Their
          Search For Work, Making{" "}
          <span>Over 160,000 Applications Every Day.</span>​
        </p>
      </div>
      <div className="card-slider" style={{ padding: "1rem" }}>
        <EmployerCardComponent />
      </div>
    </div>
  );
};

export default Corousel;
