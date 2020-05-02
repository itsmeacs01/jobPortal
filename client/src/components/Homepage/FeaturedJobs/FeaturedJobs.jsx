import React from 'react';
import './FeaturedJobs.scss';

import JobItem from '../JobItem/JobItem';

const FeaturedJobs = () => {
  return (
    <div className="jobs">
      <h2 className="jobs__heading">Featured Jobs</h2>

      <JobItem />
      <a href="#" className="jobs__more">
        Browse Jobs
      </a>
    </div>
  );
};

export default FeaturedJobs;
