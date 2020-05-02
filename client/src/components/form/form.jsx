import React from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import './form.scss';

const Field = props => {
  const { label, name, type, id } = props;
  return (
    <div className="popover-form-control">
      <label htmlFor="confirmPassword" className="popover-form-control__label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="popover-form-control__input"
        placeholder={label}
        autoComplete="off"
        id={id}
        onChange={props.handleChange}
      />
    </div>
  );
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.formName = this.props.formName;
    this.state = {
      role: null,
      userName: '',
      password: '',
      confirmPassword: '',
      category: '',
      rememberMe: false,
      phone: null
    };
  }

  register = () => {
    return (
      <React.Fragment>
        <Field
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          handleChange={this.handleChange}
        />
        <Field
          name="phone"
          type="number"
          label="Phone Number"
          id="phone"
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  };
  logIn = () => {
    return (
      <div className="popover-form__password-handle">
        <div className="popover-form-control checkbox-control">
          <input
            type="checkbox"
            name="  rememberMe"
            className="popover-form-control__input checkbox-control__input"
            placeholder="Username"
            autoComplete="off"
            onChange={this.handleChange}
          />
          <label
            htmlFor="checkbox"
            className="popover-form-control__label checkbox-control__label"
          >
            Keep me logged in
          </label>
        </div>

        <a href="#" className="link">
          Lost your password?
        </a>
      </div>
    );
  };

  setFormTitle = () => {
    if (this.formName === 'login__handle') {
      return 'Login Here';
    } else if (this.formName === 'register__handle') {
      return 'SignUp Here';
    } else if (this.formName === 'editForm') {
      return 'Edit User';
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]:
        event.target.checked && !event.target.value
          ? event.target.checked
          : event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderSubmitButtonLabel = () => {
    if (this.formName === 'register__handle') {
      return 'SignUp Here ';
    } else if (this.formName === 'login__handle') {
      return 'Log In';
    } else if (this.formName === 'editForm') {
      return 'Edit User';
    }
  };

  render() {
    return (
      <div className="popover-container">
        <h3 className="form-heading">{this.setFormTitle()}</h3>
        <form className="popover-form" onSubmit={this.handleSubmit}>
          {this.formName === 'editForm' ? null : (
            <div className="popover-form-control popover-form-control--role ">
              <div
                className={`popover-form-control__radio ${
                  this.state.role === 'employee' || this.state.role === null
                    ? 'active'
                    : null
                }`}
              >
                <label htmlFor="employee">
                  <PermIdentityIcon color="inherit" fontSize="default" />
                  Employee
                </label>
                <input
                  type="radio"
                  name="role"
                  value="employee"
                  id="employee"
                  onChange={this.handleChange}
                />
              </div>
              <div
                className={`popover-form-control__radio ${
                  this.state.role === 'employer' ? 'active' : null
                }`}
              >
                <label htmlFor="employer">
                  <PermIdentityIcon color="inherit" fontSize="default" />
                  Employer
                </label>
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  id="employer"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          )}

          <Field
            type="text"
            name="userName"
            label="Username or email"
            handleChange={this.handleChange}
          />
          <Field
            type="password"
            name="password"
            label="Password"
            handleChange={this.handleChange}
          />
          {this.formName === 'register__handle' || this.formName === 'editForm'
            ? this.register()
            : null}
          {this.formName === 'login__handle' ? this.logIn() : null}
          <button className="popover-form__submit">
            {this.renderSubmitButtonLabel()}
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
