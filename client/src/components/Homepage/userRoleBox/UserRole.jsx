import React from "react";
import "./userRole.scss";

const userRole = ({ bgColor, userRole }) => {
  return (
    <React.Fragment>
      <div className={`userRole ${bgColor === "black" ? "black" : "blue"}`}>
        <h2 className="userRole__text">I am {userRole}</h2>
        <p>
          Signed in companies are able to post new job offers, searching for
          candidate...
        </p>
        <button
          className={`userRole__btn ${
            bgColor === "black" ? "black-btn" : "blue-btn"
          }`}
        >
          Create Account
        </button>
      </div>
    </React.Fragment>
  );
};

export default userRole;
