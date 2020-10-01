import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';

const Register = ({ isAuthenticated, setAlert, registerUser }) => {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const onFormSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger')
    } else {
      registerUser({ name, email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
        <div className="form-group">
          <input value={name} onChange={e => onInputChange(e)} type="text" placeholder="Name" name="name" />
        </div>
        <div className="form-group">
          <input value={email} onChange={e => onInputChange(e)} type="email" placeholder="Email Address" name="email" />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            value={password} onChange={e => onInputChange(e)}
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="form-group">
          <input
            value={password2} onChange={e => onInputChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
}
)

export default connect(mapStateToProps, { setAlert, registerUser })(Register);
