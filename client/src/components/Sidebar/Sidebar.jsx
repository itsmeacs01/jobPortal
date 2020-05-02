import React from 'react';

import './Sidebar.scss';
import logo from './profile.jpg';

const Sidebar = props => {
  const renderSidebarItem = (item, index) => (
    <li
      className="sidebar-nav-list__item active"
      key={index}
      onClick={props.handleClick}
    >
      {item}
    </li>
  );

  return (
    <div className="sidebar">
      <figure>
        <img src={logo} alt="user-image" />
        <figcaption>Subina Tamang</figcaption>
        <span>Company Name</span>
      </figure>

      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          {['Jobs', 'Employees', ' Employers', 'Resume', 'Edit Profile'].map(
            (item, index) => {
              return renderSidebarItem(item, index);
            }
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
