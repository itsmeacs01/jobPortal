import React from 'react';

import './Employer.scss';
import UserCard from './../Card/Card';

const EmployerPage = () => {
  return (
    <div className="employees">
      <UserCard />
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
  );
};

export default EmployerPage;
