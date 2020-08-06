import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addNewExperience } from '../../actions/profile';

import PropTypes from 'prop-types';

const AddExperience = ({ addNewExperience, history }) => {

  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    company,
    title,
    location,
    from,
    to,
    current,
    description
  } = formData;


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();

    addNewExperience(formData, history);
  }


  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input value={title} onChange={e => handleChange(e)} type="text" placeholder="* Job Title" name="title" required />
        </div>
        <div className="form-group">
          <input value={company} onChange={e => handleChange(e)} type="text" placeholder="* Company" name="company" required />
        </div>
        <div className="form-group">
          <input value={location} onChange={e => handleChange(e)} type="text" placeholder="Location" name="location" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} onChange={e => handleChange(e)} type="date" name="from" />
        </div>
        <div className="form-group">
          <p><input value={current}
            type="checkbox"
            name="current"
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current })
              toggleDisabled(!toDateDisabled)
            }}
          /> {' '} Current Job</p>
        </div>

        <div className="form-group">
          <h4>To Date</h4>
          <input value={to} onChange={e => handleChange(e)} disabled={toDateDisabled ? 'disabled' : ''} type="date" name="to" />
        </div>
        <div className="form-group">
          <textarea
            value={description} onChange={e => handleChange(e)}
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addNewExperience: PropTypes.func.isRequired
}

export default connect(null, { addNewExperience })(AddExperience);
