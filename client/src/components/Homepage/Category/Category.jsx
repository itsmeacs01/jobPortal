import React from "react";

import "./Category.scss";
import CategoryItem from "./CategoryItem/CategoryItem";

const Category = () => {
  return (
    <div className="category">
      <div className="category__heading">
        <h2 className="category__heading--text">Browse By Category</h2>
        <p className="category__heading--desc">
          Each month, more than 7 million Jobhunt turn to website in their
          search for work, making over
          <span>160,000 applications every day.</span>
        </p>
      </div>
      <div className="category__list">
        <CategoryItem />
      </div>
      <button className="category__browse">Browse Category</button>
    </div>
  );
};

export default Category;
