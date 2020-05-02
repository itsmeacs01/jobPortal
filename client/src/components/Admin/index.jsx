import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';

import './adminStyle.scss';
import Sidebar from './../Sidebar/Sidebar';
import JobItem from './../Homepage/JobItem/JobItem';
import jobContext from './../../context/jobContext';
import UserCard from './../Card/Card';
import Form from './../form/form';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: 'JOBS'
    };
  }
  handleClick = event => {
    console.log(event.target.innerText);
    this.setState({ selectedItem: event.target.innerText });
  };

  renderDashBoardContent = item => {
    switch (item) {
      case 'JOBS':
        return (
          <div className="content-job">
            <JobItem />
          </div>
        );
      case 'EMPLOYEES':
        return (
          <div className="content-user">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        );
      case 'EMPLOYERS':
        return (
          <div className="content-user">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </div>
        );
      case 'EDIT PROFILE':
        return (
          <div className="edit-user">
            <Form formName="editForm" />
          </div>
        );
      case 'RESUME':
        return <div className="resume">resume</div>;
      default:
        return (
          <div className="content-user">
            <JobItem />
          </div>
        );
    }
  };
  render() {
    return (
      <div className="admin-dashboard">
        <Sidebar handleClick={this.handleClick} />
        <div className="content">
          <div className="content-title">
            <SettingsIcon color="primary" fontSize="large" />
            <h2 className="content-title__heading">Candidate Dashboard</h2>
          </div>
          <jobContext.Provider value="adminDashboard">
            {this.renderDashBoardContent(this.state.selectedItem)}
          </jobContext.Provider>
        </div>
      </div>
    );
  }
}

export default Admin;
