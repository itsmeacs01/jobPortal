import React from "react";
import "./CategoryItem.scss";

const categories = [
  {
    name: "Accounting and finance",
    jobsCount: 2,
    IconName: "FaChartBar"
  },
  {
    name: "Accounting and finance",
    jobsCount: 2,
    IconName: "FaChartBar"
  },
  {
    name: "Accounting and finance",
    jobsCount: 2,
    IconName: "FaChartBar"
  },

  {
    name: "Automative Jobs",
    jobsCount: 3,
    IconName: "FaTools"
  },
  {
    name: "Business",
    jobsCount: 4,
    IconName: "FaReact"
  },
  {
    name: "Education Training",
    jobsCount: 5,
    IconName: "FaRedditAlien"
  }
];

const CategoryItem = () => {
  return categories.map(({ name, IconName, jobsCount }) => {
    //font awesome package
    const Icon = require("react-icons/fa");

    //Extract current icon with IconName
    const CurrentIcon = Icon[IconName];

    return (
      <div className="categoryItem" key={Math.random()}>
        <div className="categoryItem__icon">
          <CurrentIcon className="icon" color="#334e6f" fontSize="3.5rem" />
        </div>
        <div className="categoryItem__name">{name}</div>
        <div className="categoryItem__num">{`${jobsCount} jobs`}</div>
        <div className="categoryItem__anime">
          <CurrentIcon color="#334e6f" fontSize="2.5rem" />
        </div>
      </div>
    );
  });
};

export default CategoryItem;
