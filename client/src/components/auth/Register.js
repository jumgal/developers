import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });


  const { name, email, password, password2 } = formData;

  const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      console.log('passwords do not match')
    } else {
      console.log('success')
    }

  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form onSubmit={e => handleSubmit(e)} className="form" action="create-profile.html">
        <div className="form-group">
          <input value={name} onChange={e => handleInputChange(e)} type="text" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input value={email} onChange={e => handleInputChange(e)} type="email" placeholder="Email Address" name="email" required />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input value={password}
            onChange={e => handleInputChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            value={password2}
            onChange={e => handleInputChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
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


export default Register;