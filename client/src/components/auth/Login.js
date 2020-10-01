import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth'

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const onFormSubmit = e => {
    e.preventDefault();

    loginUser(email, password)
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onFormSubmit(e)}>
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
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/login">Register</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
}
)

export default connect(mapStateToProps, { loginUser })(Login);
