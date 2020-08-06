import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addNewEducation } from '../../actions/profile';

import PropTypes from 'prop-types';

const AddEducation = ({ addNewEducation, history }) => {

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
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

    addNewEducation(formData, history);
  }


  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that you have attended.
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input value={school} onChange={e => handleChange(e)} type="text" placeholder="* School or Bootcamp" name="school" required />
        </div>
        <div className="form-group">
          <input value={degree} onChange={e => handleChange(e)} type="text" placeholder="* Degree or Certificate" name="degree" required />
        </div>
        <div className="form-group">
          <input value={fieldofstudy} onChange={e => handleChange(e)} type="text" placeholder="Field of Study" name="fieldofstudy" />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input value={from} onChange={e => handleChange(e)} type="date" name="from" />
        </div>
        <div className="form-group">
          <p><input value={current} onChange={e => {
            setFormData({ ...formData, current: !current })
            toggleDisabled(!toDateDisabled)
          }}

            type="checkbox" name="current" checked={current} /> {' '} Current Education / Degree</p>
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
            placeholder="Program Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addNewEducation: PropTypes.func.isRequired
}

export default connect(null, { addNewEducation })(AddEducation);
