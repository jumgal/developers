import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { loading, profile } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, [])

  return loading && profile == null ? <Spinner /> :
    <Fragment>
      <h1 className="large text-primary">
        Dashboard
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>

      {profile !== null ? <Fragment>has</Fragment> :
        <Fragment>
          <p>You have not set up a profile yet, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
        </Link>
        </Fragment>}

      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-light"
        ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link
        >
        <Link to="/add-experience" className="btn btn-light"
        ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link
        >
        <Link to="/add-education" className="btn btn-light"
        ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link
        >
      </div>

    </Fragment>
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
