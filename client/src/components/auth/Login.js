import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';

const Login = ({ loginUser, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const { email, password } = formData;

  const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();

    loginUser(email, password)
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form onSubmit={e => handleSubmit(e)} className="form" action="create-profile.html">
        <div className="form-group">
          <input value={email} onChange={e => handleInputChange(e)} type="email" placeholder="Email Address" name="email" required />
        </div>
        <div className="form-group">
          <input value={password}
            onChange={e => handleInputChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            autoComplete="on"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

export default connect(mapStateToProps, { loginUser })(Login);
