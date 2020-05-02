import React from 'react';
import { Link } from 'react-router-dom';
import Popover from '@material-ui/core/Popover';

import Form from './../form/form';

import './Nav.scss';

class NavElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    };
  }
  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open
    });
  };
  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false
    });
  };

  render() {
    let id;
    if (!(this.state.anchorEl === null)) {
      id = this.state.anchorEl.className;
    }
    const createPopOver = () => {
      return (
        <Popover
          id={id}
          classes={{
            root: 'root__el',
            paper: `popover ${
              id === 'login__handle' ? 'login-popover' : 'register-popover'
            }`
          }}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Form formName={id} />
        </Popover>
      );
    };
    return (
      <nav>
        <ul className="nav--left">
          <li className="logo">
            {/* icon */}

            <p style={{ display: 'inline' }}>
              Work<span>Up</span>
            </p>
          </li>
          <li>
            <Link to="/" className="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/candidates">Candidates</Link>
          </li>
          <li>
            <Link to="/employers">Employers</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
        </ul>
        <ul className="nav--right">
          <li className="login">
            <div
              aria-describedby={id}
              variant="contained"
              onClick={this.handleClick}
              className="login__handle"
            >
              Login
            </div>
            {createPopOver()}
          </li>
          <li className="register">
            <div
              aria-describedby={id}
              variant="contained"
              onClick={this.handleClick}
              className="register__handle"
            >
              <i className="fa fa-sign-in"></i>Register
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavElement;
