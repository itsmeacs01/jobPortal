import React from 'react';

import './homePage.scss';
import image from './img/homePage.png';
import UserRole from './userRoleBox/UserRole';
import FeaturedJobs from './FeaturedJobs/FeaturedJobs';
import Category from './Category/Category';
import Corousel from './Corousel/Corousel';

const HomePage = () => {
  return (
    <React.Fragment>
      <section className="homePage">
        <div className="homePage__primary">
          <h1 className="homePage__primary-heading">Find Perfect Jobs</h1>
          <p className="homePage__primary-paragraph">
            Grow your business with the top freelancing website.
          </p>
          <form className="homePage__search">
            <i className="fa fa-pencil edit"></i>
            <input
              type="text"
              name="search"
              placeholder="Job Title or Keywords"
            />
            <button className="submit">Find Jobs</button>
          </form>
        </div>
        <img
          className="homePage__image"
          id="homePage__hidden--image"
          src={image}
          alt="HomePage"
        />
      </section>

      <section className="homePage__role-box">
        <UserRole bgColor="blue" userRole="an Employer" />
        <UserRole bgColor="black" userRole=" a Candidate" />
      </section>
      <section className="homePage__jobs-list">
        <FeaturedJobs />
      </section>
      <section className="homePage__category">
        <Category />
      </section>
      <section className="homePage__company-corousel">
        <Corousel />
      </section>
      <footer
        className="footer"
        style={{
          textAlign: 'center',
          backgroundColor: '#21212F',
          padding: '4rem 1rem',

          color: '#fff'
        }}
      >
        @Copyright
      </footer>
    </React.Fragment>
  );
};

export default HomePage;
