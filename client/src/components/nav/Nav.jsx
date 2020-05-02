import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import NavElement from './NavElement';

import './Nav.scss';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    };
  }
  toggleDrawer = () => {
    this.setState({ openDrawer: !this.state.openDrawer });
  };

  render() {
    return (
      <div className="main-menu">
        <div className="drawer">
          <div className="menu-icon" onClick={this.toggleDrawer}>
            <MenuIcon
              fontSize="large"
              style={{
                backgroundColor: '#0088fe',
                color: '#fff',
                fontSize: '250%',
                borderRadius: '5px'
              }}
            />
            <p>
              Work<span>Up</span>
            </p>
            <PermIdentityIcon
              style={{
                cursor: 'pointer',
                marginRight: '1rem',
                fontSize: '200%'
              }}
            />
          </div>
          <Drawer
            anchor="left"
            classes={{
              paper: !this.state.openDrawer ? 'hide-drawer' : 'show-drawer'
            }}
            open={this.state.openDrawer}
            variant="persistent"
          >
            <div className="back-icon" onClick={this.toggleDrawer}>
              <ArrowBackIosIcon />
            </div>
            <NavElement />
          </Drawer>
        </div>
        <div className="horizonatal-nav">
          <NavElement />
        </div>
      </div>
    );
  }
}

export default Nav;
