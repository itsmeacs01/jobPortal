import React from 'react';
import WorkIcon from '@material-ui/icons/Work';
// import StarIcon from '@material-ui/icons/Star';
import { Pagination } from '@material-ui/lab';

import './JobItem.scss';
import jobContext from './../../../context/jobContext';

class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        {
          name: 'Product Design',
          location: 'Dhangadhi, Nepal',
          salary: '4000-5000',
          type: 'Full Time',
          deadline: '2076/50/10'
        },
        {
          name: 'HTML CSS',
          location: 'Kathmandu, Nepal',
          salary: '4000-5000',
          type: 'Internship',
          deadline: '2076/50/10'
        },
        {
          name: 'Graphics Design',
          location: 'Kathmandu, Nepal',
          salary: '4000-5000',
          type: 'Internship',
          deadline: '2076/50/10'
        },
        {
          name: 'Manager and Health',
          location: 'Kathmandu, Nepal',
          salary: '4000-5000',
          type: 'Internship',
          deadline: '2076/50/10'
        }
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        <jobContext.Consumer>
          {value => {
            return this.state.jobs.map((item, i) => {
              return (
                <div
                  className={`${
                    value === 'adminDashboard' ? 'dashboard' : 'job-item'
                  }`}
                  key={i}
                >
                  <div className="job-item__title">
                    <i className="fa fa-user-md"></i>
                    <span className="job-item__title-text">{item.name}</span>
                    {/* {(this.numRatings = 4)}
                    {this.state.ratingsArray.map((ratings, index) => {
                      return (
                        <StarIcon
                          key={index}
                          fontSize="large"
                          color="secondary"
                        />
                      );
                    })} */}
                  </div>
                  <div className="job-item__location">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span className="job-item__location-text">
                      {item.location}
                    </span>
                  </div>
                  <div className="job-item__type">
                    {value === 'adminDashboard' ? (
                      <WorkIcon
                        fontSize="small"
                        style={{ marginLeft: '-.2rem' }}
                      />
                    ) : null}

                    <span className="job-item__location-text">{item.type}</span>
                  </div>
                  <div className="job-item__salary">
                    <i className="fa fa-money"></i>
                    <span className="job-item__salary-text">{item.salary}</span>
                  </div>
                  <div className="job-item__deadline">
                    Application ends in: <span>{item.deadline}</span>
                  </div>
                  {value === 'adminDashboard' ? (
                    <React.Fragment>
                      <button className=" dashboard__admin-btn dashboard__admin-btn--edit">
                        Edit Job
                      </button>
                      <button className="dashboard__admin-btn dashboard__admin-btn--delete">
                        Delete Job
                      </button>
                    </React.Fragment>
                  ) : (
                    <button className="job-item__btn">Apply Now</button>
                  )}
                </div>
              );
            });
          }}
        </jobContext.Consumer>
        {this.props.match && this.props.match.url === '/jobs' ? (
          <Pagination
            classes={{ root: 'user-pagination' }}
            count={10}
            color="primary"
            defaultPage={1}
            size="large"
            variant="outlined"
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default JobItem;
