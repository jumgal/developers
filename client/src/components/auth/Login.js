import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const { email, password } = formData;

  const handleInputChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Success')

    const user = {
      email,
      password
    }


    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const body = JSON.stringify(user);

      const res = await axios.post('/api/auth', body, config);

      console.log(res.data)

    } catch (err) {
      console.error(err.response.message)
    }

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

export default Login;
